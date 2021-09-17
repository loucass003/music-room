import { Reducer, useReducer } from "react";
import { Message, useConversationQuery, User, useSendMessageMutation, useWatchConversationSubscription } from "../graphql/generated-types";

interface UseConversationParams {
  conversationId: string
}

type ConversationMessage = {
  __typename?: "Message" | undefined;
} & Pick<Message, "id" | "content" | "createdAt"> & {
  author: {
      __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">;
}

type ConversationAction = 
  | { type: 'loading', value: boolean }
  | { type: 'messageLoading', value: boolean }
  | { type: 'messages', messages: ConversationMessage[] }
  | { type: 'NewMessageEvent', message: Message }

interface ConversationState {
  messages?: ConversationMessage[],
  loading: boolean,
  messageSending: boolean
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
    case "messages": {
      return {
        ...state,
        messages: action.messages
      }
    }
    case "loading": {
      return {
        ...state,
        loading: action.value
      }
    }
    case "messageLoading": {
      return {
        ...state,
        loading: action.value
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
    { loading: true, messages: [], messageSending: false }
  );

  const [sendMessage] = useSendMessageMutation({})
  
  const { data } = useConversationQuery({ 
    variables: { id: conversationId, first: 50 }, //TODO: need to change
    onCompleted: ({ conversation }) => {
      dispatch({ type: 'messages', messages: conversation?.messages.edges.map(({ node }) => node) || [] })
      dispatch({ type: 'loading', value: false })
    }
  })

  useWatchConversationSubscription({ 
    variables: { conversation: conversationId }, 
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.watchConversation) {
        const event = data?.watchConversation;
        if (!event.__typename)
          throw new Error('__typename not set');
        dispatch({ type: event.__typename, ...(event as any) })
    }
  }});

  return {
    conversation: data?.conversation,
    state,
    sendMessage: async (content: string): Promise<void> => {
      dispatch({ type: "messageLoading", value: true })
      await sendMessage({ variables: { content, conversation: conversationId } })
      dispatch({ type: "messageLoading", value: false })
    }
  }
}