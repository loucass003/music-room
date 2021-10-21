import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ChangeSettingsForm } from '@music-room/common'
import { useForm } from 'react-hook-form'
import { useChangeSettingsMutation } from '../../graphql/generated-types'
import { useSession } from '../../hooks/session'
import { Button } from '../commons/ui/Button'
import { Input } from '../commons/ui/Input'
import { Box } from '../commons/ui/Box'

export function Settings() {
  const { session, updateSession } = useSession()
  const [changeSettings] = useChangeSettingsMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeSettingsForm>({
    resolver: classValidatorResolver(ChangeSettingsForm),
    defaultValues: {
      email: session.session!.me.email,
      name: session.session!.me.name,
    },
  })

  const onSubmit = async (variables: ChangeSettingsForm) => {
    await changeSettings({ variables: { id: session.session!.me.id, ...variables }})
    updateSession()
  }

  return (
    <Box insideSpacing>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <div className="text-lg font-bold">Settings</div>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Your name"
            label="Name"
            {...register('name', {
              setValueAs: val =>
                val === '' || val === session.session!.me.name ? undefined : val,
            })}
            error={errors.name?.message}
          ></Input>
          <Input
            type="text"
            placeholder="Your email"
            label="Email"
            {...register('email', {
              setValueAs: val =>
                val === '' || val === session.session!.me.email ? undefined : val,
            })}
            error={errors.email?.message}
          ></Input>
          <Button>Submit</Button>
        </div>
      </form>
    </Box>
  )
}
