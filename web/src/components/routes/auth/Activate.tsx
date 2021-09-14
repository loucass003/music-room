import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActivateAccountMutation } from "../../../graphql/generated-types";
import { Button } from "../../commons/ui/Button";


export function Activate() {
  const { validationCode } = useParams<{ validationCode: string }>();
  const [activate, { error }] = useActivateAccountMutation();
  const history = useHistory();
  const [displayActivated, setDisplayActivated] = useState(false);

  
  useEffect(() => {
    if (validationCode) {
      activate({ variables: { validationCode } })
        .then(({ data }) => {
          if (data?.activateAccount) {
            setDisplayActivated(true);
          }
        })
    }
  }, [validationCode, activate, history])

  return (
    displayActivated 
    ? <div>
        Your account has been activated
        <Button to="/auth/sign-in">Go to login</Button>
      </div> 
    : validationCode 
      ? error 
        ? <div>Unable to activate your account: {error.message} </div> 
        : <div>Activating your account</div>
      : <div>Check your mails</div> 
  )
}