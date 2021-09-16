import { useForm } from "react-hook-form";
import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";
import { ApiErrors, DeviceForm } from "@music-room/common";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { DeviceLocal, useSession } from "../../hooks/session";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFallbackRouter } from "../../router";
import { useCreateDeviceMutation } from "../../graphql/generated-types";
import { v4 as uuidv4 } from 'uuid';
import { useError } from "../../hooks/error";


export function Device() {
  const { findError } = useError()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DeviceForm>({
    resolver: classValidatorResolver(DeviceForm),
  })
  const [createDeviceMutation, { loading: formLoading }] = useCreateDeviceMutation({
    onError: (e) => {
      const error = findError(e);
      if (error && error.type === ApiErrors.AUTH_DEVICE_NAME_ALREADY_EXISTS) {
        setError('name', { message: error.message })
      }
    }
  });
  const { fallback, hasFallbackRoute } = useFallbackRouter();
  const { createDevice, loading, hasDevice } = useSession();
  const history = useHistory()

  const onSubmit = async (variables: DeviceForm) => {
    const device: DeviceLocal = {
      deviceName: variables.name,
      deviceSecret: uuidv4()
    };
    const { data } = await createDeviceMutation({ variables: device });
    
    if (data?.createDevice)
      createDevice(device);
  }

  useEffect(() => {
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
            <Button loading={formLoading}>Submit</Button>
          </div>
        </div>
    </form>
  )
}