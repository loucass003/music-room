import { Maybe } from "graphql/jsutils/Maybe";
import { Reducer, useReducer } from "react";
import { Conversation, Message, useConversationQuery, User, useSendMessageMutation, useWatchConversationSubscription } from "../graphql/generated-types";
import { useError } from "./error";

interface UseConversationParams {
  conversationId: string,
}

export type ConversationMessage = {
  __typename?: "Message" | undefined;
} & Pick<Message, "id" | "content" | "createdAt"> & {
  author: {
      __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">;
}

type ConversationResult = Maybe<(     
  { __typename?: 'Conversation' }
  & Pick<Conversation, 'id'>
  & { members: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )>, messages: (
    { __typename?: 'ConversationMessagesConnection' }
    & { edges: Array<(
      { __typename?: 'MessageEdge' }
      & { node: (
        { __typename?: 'Message' }
        & Pick<Message, 'id' | 'content' | 'createdAt'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        ) }
      ) }
    )> }
  ) })>

type ConversationAction = 
  | { type: 'loading', value: boolean }
  | { type: 'conversation', conversation?: ConversationResult }
  | { type: 'messageSending', value: boolean }
  | { type: 'messages', messages: ConversationMessage[] }
  | { type: 'NewMessageEvent', message: Message }
  | { type: 'loadingNextPage', value: boolean}

interface ConversationState {
  messages?: ConversationMessage[],
  loading: boolean,
  messageSending: boolean,
  conversation?: ConversationResult, 
  conversationNotFound: boolean,
  loadingNextPage: boolean
}

function conversationReducer(
  state: ConversationState,
  action: ConversationAction
) {
  switch (action.type) {
    case "NewMessageEvent": {
      return {
        ...state,
        messages: [...state.messages || [], action.message]
      }
    }
    case "conversation": {
      return {
        ...state,
        loading: false,
        conversationNotFound: !action.conversation,
        conversation: action.conversation,
        messages: action.conversation?.messages.edges.map(({ node }) => node) || []
      }
    }
    case "loading": {
      return {
        ...state,
        loading: action.value
      }
    }
    case "loadingNextPage": {
      return {
        ...state,
        loadingNextPage: action.value
      }
    }
    case "messageSending": {
      return {
        ...state,
        messageSending: action.value
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}

export function useConversation({ conversationId }: UseConversationParams) {
  const [state, dispatch] = useReducer<Reducer<ConversationState, ConversationAction>>(
    conversationReducer,
    { loading: true, messages: [], messageSending: false, conversationNotFound: false, loadingNextPage: false }
  );
    
  const [sendMessage] = useSendMessageMutation({})
  const { onGQLError } = useError();
  
  useConversationQuery({ 
    variables: { id: conversationId, first: 12 }, //TODO: need to change
    onCompleted: ({ conversation }) => {
      dispatch({ type: 'conversation', conversation });
    },
    onError: (error) => {
      onGQLError(error);
    }
  })

  useWatchConversationSubscription({ 
    variables: { conversation: conversationId }, 
    onSubscriptionData: ({ subscriptionData: { data , error }}) => {
      if (data?.watchConversation) {
        const event = data?.watchConversation;
        if (!event.__typename)
          throw new Error('__typename not set');
        dispatch({ type: event.__typename, ...(event as any) })
      }
      if (error) {
        console.log(error)
      }
    },
  });

  return {
    state,
    sendMessage: async (content: string) => {
      dispatch({ type: "messageSending", value: true })
      const message = await sendMessage({ variables: { content, conversation: conversationId }, errorPolicy: 'none' })
      dispatch({ type: "messageSending", value: false })
      return message;
    },
    nextPage: () => {
      dispatch({ type: "loadingNextPage", value: true })
      setTimeout(() => {
        console.log('next page')
        dispatch({ type: "loadingNextPage", value: false })
      }, 3000)
;      // dispatch({ type:  })
    }
  }
}