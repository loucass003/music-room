import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { RegisterForm } from "@music-room/common";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../graphql/generated-types";
import { Input } from "../commons/ui/Input";
import { Button } from "../commons/ui/Button";
import { useHistory } from "react-router-dom";



export function SignUp() {
  const [registerMutation, { loading }] = useRegisterMutation();
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: classValidatorResolver(RegisterForm),
  })
  const onSubmit = async (variables: RegisterForm) => {
    const { data } = await registerMutation({ variables });

    if (data && data.register) {
      history.push('/auth/activate');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:w-72">
      <div className="text-5xl">Sign Up</div>
      <div className="divide-y divide-gray-200 w-full">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <ul className="list-disc space-y-2">
            <li className="flex">
              <Input {...register('name')} error={errors.name?.message} label="Name"></Input>
            </li>
            <li className="flex">
              <Input
                {...register('email')}
                error={errors.email?.message}
                label="Email"
              ></Input>
            </li>
            <li className="flex">
              <Input
                type="password"
                {...register('password')}
                error={errors.password?.message}
                label="Password"
              ></Input>
            </li>
            <li className="flex">
              <Input
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                label="Confirm Password"
              ></Input>
            </li>
          </ul>
        </div>
        <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex gap-3 flex-col">
          <Button loading={loading}>Submit</Button>
          <Button to="/auth/sign-in" text>I already have an account</Button>
        </div>
      </div>
    </form>
  )
}