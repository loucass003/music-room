import { Maybe } from "graphql/jsutils/Maybe";
import { Reducer, useReducer } from "react";
import { Conversation, Message, MessageEdge, PageInfo, Scalars, useConversationMessagesLazyQuery, useConversationQuery, User, useSendMessageMutation, useWatchConversationSubscription } from "../graphql/generated-types";
import { useError } from "./error";

interface UseConversationParams {
  conversationId: string,
  itemsPerPage: number,
  onNewMessage: (message: MessageNode) => void 
}

export type MessageNode =  (
  { __typename?: 'Message' } 
  & Pick<Message, 'id' | 'content' | 'createdAt'>
  & { author: ({ __typename?: 'User' } & Pick<User, 'id' | 'name'>)}
) ;

export type ConversationMessageEdge = (
  { __typename?: 'MessageEdge' }
  & Pick<MessageEdge, 'cursor'>
  & { 
    node: MessageNode
  }
);

export type ConversationMessages = Array<ConversationMessageEdge>

type ConversationResult = Maybe<(
  { __typename?: 'Conversation' }
  & Pick<Conversation, 'id'>
  & { 
    members: Array<({ __typename?: 'User' } & Pick<User, 'id' | 'name'>)>, 
    messages: (
      { __typename?: 'ConversationMessagesConnection' } 
      & { 
        pageInfo: ({ __typename?: 'PageInfo' } & Pick<PageInfo, 'hasNextPage'>),
        edges: ConversationMessages 
      }
    ) 
  }
)>

type ConversationAction = 
  | { type: 'loading', value: boolean }
  | { type: 'conversation', conversation?: ConversationResult }
  | { type: 'messageSending', value: boolean }
  | { type: 'NewMessagesEvent', messages: ConversationMessages, hasNextPage: boolean }
  | { type: 'NewMessageEvent', message: MessageNode }
  | { type: 'loadingNextPage', value: boolean}

interface ConversationState {
  messages?: ConversationMessages,
  loading: boolean,
  messageSending: boolean,
  conversation?: ConversationResult, 
  conversationNotFound: boolean,
  loadingNextPage: boolean,
  hasNextPage: boolean
}

function conversationReducer(
  state: ConversationState,
  action: ConversationAction
) {
  switch (action.type) {
    case "NewMessageEvent": {
      return {
        ...state,
        messages: [{ node: action.message, cursor: 'NULL' }, ...state.messages || []]
      }
    }
    case "NewMessagesEvent": {
      return {
        ...state,
       messages: [...state.messages || [], ...action.messages],
       hasNextPage: action.hasNextPage
      }
    }
    case "conversation": {
      return {
        ...state,
        loading: false,
        conversationNotFound: !action.conversation,
        conversation: action.conversation,
        messages: action.conversation?.messages.edges,
        hasNextPage: action.conversation?.messages.pageInfo.hasNextPage || false
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

export function useConversation({ conversationId, itemsPerPage, onNewMessage }: UseConversationParams) {
  const [state, dispatch] = useReducer<Reducer<ConversationState, ConversationAction>>(
    conversationReducer,
    { loading: true, messages: [], messageSending: false, conversationNotFound: false, loadingNextPage: false, hasNextPage: false }
  );
    
  const [sendMessage] = useSendMessageMutation({})
  const {onGQLError} = useError();
  const [queryMessages] = useConversationMessagesLazyQuery({
    onError: (error) => {
      onGQLError(error);
    },
    nextFetchPolicy: 'network-only',
    onCompleted: ({ conversation }) => {
      dispatch({ type: 'NewMessagesEvent', messages: conversation?.messages.edges || [], hasNextPage: conversation?.messages.pageInfo.hasNextPage || false })
      dispatch({ type: "loadingNextPage", value: false })
    }
  });
  
  useConversationQuery({ 
    variables: { id: conversationId, first: itemsPerPage }, //TODO: need to change
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
        if (event.__typename === 'NewMessageEvent') {
          onNewMessage(event.message)
        }
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
    loadMessages: (after: Scalars['ConnectionCursor']) => {
      if (state.loadingNextPage || !state.hasNextPage) return;
      dispatch({ type: "loadingNextPage", value: true })
      queryMessages({ variables: { id: conversationId, first: itemsPerPage, after } })
     
    },
    messages: [...state.messages || []].reverse()
  }
}