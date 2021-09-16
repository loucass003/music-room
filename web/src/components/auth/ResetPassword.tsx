import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ResetPasswordForm } from "@music-room/common";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useResetPasswordMutation, useVerifyResetPasswordTokenQuery } from "../../graphql/generated-types";
import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";


export function ResetPassword() {
    const { token, id } = useParams<{ token: string, id: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        resolver: classValidatorResolver(ResetPasswordForm),
    })

    const { loading: verifiyingToken, data } = useVerifyResetPasswordTokenQuery({ variables: { id, token } });

    const history = useHistory();
    const [resetPassword, { loading }] = useResetPasswordMutation();
    const { addToast } = useToasts()

    const onSubmit = async (variables: ResetPasswordForm) => {
        const { data } = await resetPassword({ variables: { id, token, ...variables } });
        if (data?.resetPassword) {
            history.push('/auth/sign-in')
            addToast('Your password has been reset successfully!', { appearance: 'success', autoDismiss: true })
        }
    }

    return (
        verifiyingToken 
        ? <div className="md:w-72">Verifying token</div>
        : data?.verifyResetPasswordToken 
            ? <form onSubmit={handleSubmit(onSubmit)} className="md:w-72">
                <div className="text-5xl">Password Reset</div>
                <div className="divide-y divide-gray-200 w-full">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <ul className="list-disc space-y-2">
                    <li className="flex">
                        <Input type="password" {...register('password')} error={errors.password?.message} label="Enter your new password"></Input>
                    </li>
                    <li className="flex">
                        <Input type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} label="Confirm your new password"></Input>
                    </li>
                    </ul>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex gap-3 flex-col">
                    <Button loading={loading}>Submit</Button>
                </div>
                </div>
            </form>
            : <div className="md:w-72">Invalid Token</div>
    )
}