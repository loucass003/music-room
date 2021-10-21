import { useParams } from "react-router-dom"
import { usePlaylistQuery } from "../../graphql/generated-types"
import { FullscreenLoader } from "../commons/FullscreenLoader"
import { Navbar } from "../commons/Navbar"
import { Box } from "../commons/ui/Box"

export function Playlist() {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = usePlaylistQuery({ variables: { id } })

  console.log(data)

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-4 h-full app-playlist">
        <div  className="flex flex-grow flex-col h-full gap-4">
          <Box className="flex-grow">Player {data?.playlist?.name}</Box>
          <Box className="h-1/3">Informations</Box>
        </div>
        <Box insideSpacing className="h-full w-1/3 max-w-sm">
          chat box
        </Box>
      </div>
    </div>
  )
}