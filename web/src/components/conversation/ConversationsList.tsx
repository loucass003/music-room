import { faUserFriends } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom"
import { useConversationsListQuery, User } from "../../graphql/generated-types"

const ConversationItem = ({ id, members }: { id: string, members: Pick<User, 'id' | 'name'>[] }) => {
  const { id: pageId } = useParams<{ id: string }>()

  return ( 
    <Link to={`/conversation/${id}`} className={`flex flex-row flex-grow items-center hover:bg-gray-100 rounded-lg px-2 ${id === pageId && 'bg-color-gray-50'}`}>
      <div className="flex w-10 h-10 min-w-10 rounded-full items-center justify-center bg-gray-300">
        <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
      </div>
      <div className="flex flex-grow h-full p-4 min-w-0">
        <span className="flex-1 truncate">{members.map(({ name }) => name).join(', ')}</span>
      </div>
    </Link>
  )
}


export function ConversationList() {

  const { data, loading } = useConversationsListQuery()

  return (
    <div className="flex-auto min-h-0 flex-col">
      {loading && <h1>Loading</h1>}
      {data && data.conversations.edges.map(({ node }) => <ConversationItem key={node.id} id={node.id} members={node.members}></ConversationItem>) }
      {data && data.conversations.edges.length === 0 && <h1>You have no conversations</h1>}
    </div>
  )
}