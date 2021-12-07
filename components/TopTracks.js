import { useRecoilValue } from "recoil";
import { artistTopTrackslistsState } from "../atoms/topListAtom";
import TopTrack from "./TopTrack";

function TopTracks() {
  const artistTopTrackLists = useRecoilValue(artistTopTrackslistsState);
  console.log("top artist tracks >>>", artistTopTrackLists);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {artistTopTrackLists?.tracks?.map((track, i) => (
        <TopTrack key={track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default TopTracks;
