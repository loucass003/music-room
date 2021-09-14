import { useForm } from "react-hook-form";
import { Button } from "../../commons/ui/Button";
import { Input } from "../../commons/ui/Input";
import { DeviceForm } from "@music-room/common";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useSession } from "../../../hooks/session";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFallbackRouter } from "../../../router";


export function Device() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeviceForm>({
    resolver: classValidatorResolver(DeviceForm),
  })
  const { fallback, hasFallbackRoute } = useFallbackRouter();
  const { createDevice, loading, hasDevice } = useSession();
  const history = useHistory()

  const onSubmit = async (variables: DeviceForm) => {
    createDevice(variables.name);
  }

  useEffect(() => {
    console.log(loading, hasDevice)
    if (!loading && hasDevice) {
      if (hasFallbackRoute) fallback();
      else history.push('/')
    }
  }, [loading, hasDevice, fallback, hasFallbackRoute, history])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:w-72">
       <div className="text-5xl">New Device</div>
        <div className="divide-y divide-gray-200 w-full">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <ul className="list-disc space-y-2">
              <li className="flex">
                <Input {...register('name')} error={errors.name?.message} label="Device name"></Input>
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