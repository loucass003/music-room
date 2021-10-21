import { useParams } from "react-router-dom";
import { Conversation } from "./Conversation";


export function ConversationPage() {
  const { id } = useParams<{ id: string }>()
  return <Conversation id={id}></Conversation>
}