import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActivateAccountMutation } from "../../graphql/generated-types";


export function Activate() {
  const { validationCode } = useParams<{ validationCode: string }>();
  const [activate, { error }] = useActivateAccountMutation();
  const history = useHistory();

  
  useEffect(() => {
    if (validationCode) {
      activate({ variables: { validationCode } })
        .then(({ data }) => data?.activateAccount && history.push('/auth/sign-in'))
    }
  }, [validationCode, activate, history])

  return (
    validationCode 
      ? error 
        ? <div>Unable to activate your account: {error.message} </div> 
        : <div>Activating your account</div>
      : <div>Check your mails</div> 
  )
}