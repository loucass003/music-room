import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SendMessageForm } from "@music-room/common";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { ConversationMessage, useConversation } from "../../hooks/conversation";
import { FullscreenLoader } from "../commons/FullscreenLoader";
import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";
import { ConversationNotFound } from "./ConversationNotFound";


export function Message({ message }: { message: ConversationMessage }) {

  const [date, setDate] = useState('');

  useEffect(() => {
    const date = new Date(Date.parse(message.createdAt));
    const options: Intl.DateTimeFormatOptions = {
      hour12: true,
      day: 'numeric',
      month: '2-digit',
      year: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    setDate(new Intl.DateTimeFormat("en", options).format(date))
  }, [message.createdAt])

  return (
    <div className="flex flex-row w-full my-2 px-2 py-2 hover:bg-gray-100 gap-2">
      <div className="flex w-11 h-11 min-w-11 rounded-full items-center justify-center bg-gray-300">
        {message.author.name.substr(0, 1).toUpperCase()}
      </div>
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


export function Conversation() {
  const { id } = useParams<{ id: string }>()

  const { state, sendMessage, nextPage } = useConversation({ conversationId: id });
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (event.currentTarget.scrollTop <= 10 && !state.loadingNextPage) {
      nextPage();
    }
  }

  useLayoutEffect(() => {
    if (containerRef && containerRef.current && !state.loading)
      containerRef.current.scrollTo({ top: containerRef.current.offsetHeight });
  }, [state.loading])


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
              {state.loadingNextPage && <div>loading</div>}
              {state.messages?.map((message) => <Message key={message.id} message={message}></Message>)}
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