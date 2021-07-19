import { Button } from '../commons/ui/Button'
import { Input } from '../commons/ui/Input'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { useForm } from 'react-hook-form'
import { RegisterForm } from '@music-room/common'

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: classValidatorResolver(RegisterForm),
  })
  const onSubmit = (data: RegisterForm) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-5xl max-w-xs">Sign In</div>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <ul className="list-disc space-y-2">
            <li className="flex">
              <Input {...register('name')} error={errors.name?.message}></Input>
            </li>
            <li className="flex">
              <Input
                {...register('email')}
                error={errors.email?.message}
              ></Input>
            </li>
            <li className="flex">
              <Input
                {...register('password')}
                error={errors.password?.message}
              ></Input>
            </li>
          </ul>
        </div>
        <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  )
}
