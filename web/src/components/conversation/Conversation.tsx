import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SendMessageForm } from "@music-room/common";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useConversationQuery, useSendMessageMutation, useWatchConversationSubscription } from "../../graphql/generated-types"
import { useConversation } from "../../hooks/conversation";
import { useError } from "../../hooks/error";
import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";

export function Conversation() {
  const { onGQLError } = useError()
  const { id } = useParams<{ id: string }>()

  const { conversation, state, sendMessage } = useConversation({ conversationId: id });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageForm>({
    resolver: classValidatorResolver(SendMessageForm),
  })

  const onSubmit = async (variables: SendMessageForm) => {
    await sendMessage(variables.content)
    reset()
  }

  return (
    state.loading 
      ? <h1>loading</h1>
      : <div className="flex flex-col h-full">
          <div className="flex h-12 border-b-2 border-solid border-gray-100 ">
            {conversation?.members.map(({ name }) => name).join(', ')}
          </div>
          <div className="flex flex-grow py-4 flex-col">
            <div className="overflow-y-scroll">
              {state.messages?.map(({ id, content }) => <div key={id} className="flex h-16">{content}</div>)}
            </div>
          </div>
          <div className="flex flex-col border-t-2 border-solid border-gray-100 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="text" {...register('content')} disabled={state.messageSending} error={errors.content?.message} placeholder="Send a message"></Input>
              <Button loading={state.messageSending}>Submit</Button>
            </form>
          </div>
        </div>
  )
}