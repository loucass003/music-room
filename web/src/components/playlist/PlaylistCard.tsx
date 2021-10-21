import { Box } from "../commons/ui/Box"

export function PlaylistCard() {
  return (
    <Box className="h-60 flex items-center justify-around flex-col">
      <div className="flex-grow bg-gray-300 w-full rounded-t-lg loading-effect"></div>
      <div className="p-2 w-full">
        playlist name
      </div>
    </Box>
  )
}