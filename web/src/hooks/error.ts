import { ApolloError } from "@apollo/client";
import { ApiError } from "@music-room/common";
import { useToasts } from "react-toast-notifications";

export function useError() {
  const { addToast } = useToasts()

  return {
    onGQLError: (error: ApolloError) => addToast(error.message, { appearance: 'error', autoDismiss: true }),
    findError: (error: ApolloError): ApiError => error.graphQLErrors.map(({ extensions }) => extensions?.exception?.response).find((res) => !!res)
  }
}