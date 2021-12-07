import { useRecoilValue } from "recoil";
import { currentSearchResultsState } from "../atoms/searchAtom";
import TrackSearchResult from "./TrackSearchResult";

function TrackSearchResults() {
  const searchResults = useRecoilValue(currentSearchResultsState);
  console.log("logger >>> ", searchResults);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {searchResults?.tracks?.items.map((track, i) => (
        <TrackSearchResult key={track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default TrackSearchResults;
