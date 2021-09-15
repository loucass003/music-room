import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../../commons/ui/Input";
import { Button } from "../../commons/ui/Button";
import { LoginForm } from "@music-room/common";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useFallbackRouter } from "../../../router";
import { useLoginMutation } from "../../../graphql/generated-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useSession } from "../../../hooks/session";
import { useEffect } from "react";
import { useError } from "../../../hooks/error";


export function SignIn() {
  const { onGQLError } = useError();
  const [loginMutation, { loading: loginLoading }] = useLoginMutation({ onError: onGQLError });
  const history = useHistory()
  const { updateSession, hasDevice, loading, isLoggedIn } = useSession();
  const { fallback, hasFallbackRoute } = useFallbackRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: classValidatorResolver(LoginForm),
  })
  const onSubmit = async (variables: LoginForm) => {
      const { data } = await loginMutation({ variables });
      if (data && data.login) {
        updateSession()
      }
  }

useEffect(() => {
    if (!loginLoading && isLoggedIn) {
      console.log('redirect')
      if (hasFallbackRoute && hasDevice) fallback();
      else history.push('/')
    }
  }, [loading, loginLoading, isLoggedIn, hasDevice, history, hasFallbackRoute, fallback])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:w-72">
      <div className="text-5xl">Sign In</div>
      <div className="divide-y divide-gray-200 w-full">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <ul className="list-disc space-y-2">
            <li className="flex">
              <Input {...register('email')} error={errors.email?.message} label="Email"></Input>
            </li>
            <li className="flex">
              <Input
                type="password"
                {...register('password')}
                error={errors.password?.message}
                label="Password"
              ></Input>
            </li>
            <li className="flex items-end flex-col">
              <Link to="/auth/reset-password" className="hover:text-black text-sm">Foggot password?</Link>
            </li>
          </ul>
        </div>
        <div className="divide-y divide-gray-200 w-full py-3 flex flex-col">
          <Button><FontAwesomeIcon icon={faGoogle} className="mr-3"/>Google Account</Button>
        </div>
        <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex gap-3 flex-col">
          <Button loading={loginLoading}>Submit</Button>
          <Button to="/auth/sign-up" text>Create my account</Button>
        </div>
      </div>
    </form>
  )
}