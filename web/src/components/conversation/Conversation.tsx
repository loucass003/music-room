import { useParams } from "react-router-dom"
import { useConversationQuery } from "../../graphql/generated-types"

export function Conversation() {
  const { id } = useParams<{ id: string }>()

  const { loading, data } = useConversationQuery({ variables: { id } })

  return (
    loading 
      ? <h1>loading</h1>
      : <div className="flex flex-col h-full">
          <div className="flex h-12 border-b-2 border-solid border-gray-100 ">
            {data?.conversation?.members.map(({ name }) => name).join(', ')}
          </div>
          <div className="flex flex-grow py-4 flex-col">
            <div className="overflow-y-scroll">
            <div className="flex h-16">MESSAGE</div>
            <div className="flex h-16">MESSAGE</div>
            <div className="flex h-16">MESSAGE</div>
            <div className="flex h-16">MESSAGE</div>
            <div className="flex h-16">MESSAGE</div>
            <div className="flex h-16">MESSAGE</div>
            </div>
          </div>
          <div className="flex flex-col border-t-2 border-solid border-gray-100 py-4">
            SEND
          </div>
        </div>
  )
}