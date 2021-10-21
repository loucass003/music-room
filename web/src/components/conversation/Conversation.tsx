import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SendMessageForm } from "@music-room/common";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { MessageNode, useConversation } from "../../hooks/conversation";
import { useSession } from "../../hooks/session";
import { FullscreenLoader } from "../commons/FullscreenLoader";
import { ProfilePicture } from "../commons/ProfilePicture";
import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";
import { ConversationNotFound } from "./ConversationNotFound";

dayjs.extend(relativeTime)

export interface ConversationProps {
  id: string;
}


export function Message({ message }: { message: MessageNode }) {

  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(dayjs(message.createdAt).fromNow())
  }, [message.createdAt])

  return (
    <div className="flex flex-row w-full my-2 px-2 py-2 hover:bg-gray-100 gap-2">
      <ProfilePicture className="w-11 h-11" userId={message.author.id}></ProfilePicture>
      <div className="flex flex-grow flex-col">
        <div className="text-sm">
          {message.author.name}
          <span className="text-xs px-3">{date}</span>
        </div>
        <div className="flex">
          {message.content}
        </div>
      </div>
    </div>
  )
}


export function Conversation({ id }: ConversationProps) {
  const { session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  const onNewMessage = (message: MessageNode) => {
    if (containerRef && containerRef.current 
        && (
          message.author.id === session.session?.me.id 
          || (
            message.author.id !== session.session?.me.id 
            && containerRef.current.offsetHeight + containerRef.current.scrollTop + 150 >= containerRef.current.scrollHeight
          )
        )
    ) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
    }
  }

  const { state, sendMessage, loadMessages, messages } = useConversation({ conversationId: id, itemsPerPage: 15, onNewMessage });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageForm>({
    resolver: classValidatorResolver(SendMessageForm),
  })

  const onSubmit = async (variables: SendMessageForm) => {
    const {errors} = await sendMessage(variables.content)
    if (errors) { //TODO: need to handle this case
      console.log(errors);
    }
    reset()
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop <= 50 && messages && messages[0]) {
      loadMessages(messages[0].cursor);
    }
  }

  useLayoutEffect(() => {
    if (containerRef && containerRef.current && !state.loading)
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
   
  }, [state.loading])
  
  useEffect(() => {
    if (containerRef.current?.scrollTop === 0 && state.hasNextPage && messages && messages[0])
      loadMessages(messages[0].cursor);
  }, [messages, state.hasNextPage, containerRef, loadMessages])

  return (
    state.loading 
      ? <FullscreenLoader relative></FullscreenLoader>
      : state.conversationNotFound
        ? <ConversationNotFound></ConversationNotFound>
        : <div className="app-conversation">
            <div className="px-2 flex flex-col justify-center h-12 py-4 border-b-2 border-solid border-gray-100">
              {state.conversation?.members.map(({ name }) => name).join(', ')}
            </div>
            <div onScroll={(e) => handleScroll(e)} className="app-conversation__container" ref={containerRef}>
              {state.loadingNextPage &&
                <div className="h-20">
                  <FullscreenLoader relative></FullscreenLoader>
                </div>
              }
              {!state.loadingNextPage && !state.hasNextPage && 
                <div className="h-20 flex flex-col justify-center items-center text-lg font-bold">No more messages</div>
              }
              {messages?.map(({ node }) => <Message key={node.id} message={node}></Message>)}
            </div>
            <div className="px-2 pb-2 border-t-2 border-solid border-gray-100 py-4">
              <form className="flex flex-row w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-grow">
                  <Input className="flex" type="text" {...register('content')} disabled={state.messageSending} error={errors.content?.message} placeholder="Send a message"></Input>
                </div>
                <div className="flex">
                  <Button  loading={state.messageSending}>Submit</Button>
                </div>
              </form>
            </div>
          </div>
  )
}