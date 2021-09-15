import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SendResetPasswordForm } from "@music-room/common";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendResetPasswordMutation } from "../../../graphql/generated-types";
import { Button } from "../../commons/ui/Button";
import { Input } from "../../commons/ui/Input";


export function SendResetPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SendResetPasswordForm>({
        resolver: classValidatorResolver(SendResetPasswordForm),
    })

    const [sendResetPassword, { loading }] = useSendResetPasswordMutation();
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (variables: SendResetPasswordForm) => {
        const { data } = await sendResetPassword({ variables })
        if (data?.sendResetPassword) {
            setShowSuccess(true);
        }
    }

    return (
        showSuccess
        ? <div className="md:w-72">Check your mails</div>
        : <form onSubmit={handleSubmit(onSubmit)} className="md:w-72">
            <div className="text-5xl">Password Reset</div>
            <div className="divide-y divide-gray-200 w-full">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">
                <li className="flex">
                    <Input type="email" {...register('email')} error={errors.email?.message} label="Your account email"></Input>
                </li>
                </ul>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex gap-3 flex-col">
                <Button loading={loading}>Submit</Button>
            </div>
            </div>
        </form>
    )
}