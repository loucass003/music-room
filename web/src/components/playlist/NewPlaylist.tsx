import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreatePlaylistForm } from "@music-room/common";
import { useForm } from "react-hook-form";
import { Box } from "../commons/ui/Box";
import { Input } from "../commons/ui/Input";
import { Button } from "../commons/ui/Button";
import { Checkbox } from "../commons/ui/Checkbox";
import { useCreatePlaylistMutation } from "../../graphql/generated-types";
import { useError } from "../../hooks/error";
import { useHistory } from "react-router-dom";


export function NewPlaylist() {
  const { onGQLError } = useError();
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlaylistForm>({
    resolver: classValidatorResolver(CreatePlaylistForm),
  })

  const [createPlaylist, { loading }] = useCreatePlaylistMutation({ onError: onGQLError });

  const onSubmit = async (variables: CreatePlaylistForm) => {
    const { data } = await createPlaylist({ variables });
    if (data && data.createOnePlaylist) {
      history.push(`/playlist/${data.createOnePlaylist.id}`)
    }
  }

  return (
    <Box insideSpacing>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex justify-center">
          <div className="text-lg font-bold">Create a new playlist</div>
        </div>
        <div className="flex flex-col gap-4">
          <Input {...register('name')} error={errors.name?.message} label="Playlist Name"></Input>
          <Checkbox {...register('public')} error={errors.public?.message} label="Public playlist ?"></Checkbox>
          <Checkbox {...register('everyoneCanEdit')}  error={errors.everyoneCanEdit?.message} label="Everyone can edit ?"></Checkbox>
          <Button loading={loading}>Submit</Button>
        </div>
      </form>
    </Box>
  )
}