import { Box } from "../commons/ui/Box";
import { Button } from '../commons/ui/Button'
import { PlaylistCard } from "../playlist/PlaylistCard";

export function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-center pb-4 font-bold">
        <div className="text-xl">My playlists</div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4">
        <Box className="lg:col-span-2 flex items-center justify-around flex-col" insideSpacing>
          <div className="text-lg font-bold">Create my playlist</div>
          <Button to="/playlist/new">Add playlist</Button>
        </Box>
        <PlaylistCard></PlaylistCard>
        <PlaylistCard></PlaylistCard>
        <PlaylistCard></PlaylistCard>
      </div>
      <div className="flex flex-row w-full justify-center py-4 font-bold">
        <div className="text-xl">People Playlists</div>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 flex-row flex-grow h-60 w-full gap-4">
        <PlaylistCard></PlaylistCard>
        <PlaylistCard></PlaylistCard>
        <PlaylistCard></PlaylistCard>
        <PlaylistCard></PlaylistCard>
      </div>
    </div>
  );
}