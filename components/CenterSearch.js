import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import {
  artistTopTrackslistsState,
  topTrackslistsState,
} from "../atoms/topListAtom";
import TrackSearchResults from "../components/TrackSearchResults";
import Header from "../components/Header";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import {
  currentSearchResultsState,
  currentSearchState,
} from "../atoms/searchAtom";
import TopTracks from "./TopTracks";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function CenterSearch() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const [searchResults, setSearchResults] = useRecoilState(
    currentSearchResultsState
  );
  const [topTrackLists, setTopTrackLists] = useRecoilState(topTrackslistsState);
  const [artistTopTrackLists, setArtistTopTrackLists] = useRecoilState(
    artistTopTrackslistsState
  );
  const playlistId = useRecoilValue(playlistIdState);
  const search = useRecoilValue(currentSearchState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const debouncedSearch = useCallback(
    debounce((search) => {
      spotifyApi
        .searchTracks(search)
        .then((res) => {
          setSearchResults(res.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }, 500),
    []
  );

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getMyTopTracks()
      .then((data) => {
        setTopTrackLists(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi]);

  useEffect(() => {
    spotifyApi
      .getArtistTopTracks(
        topTrackLists?.items[0].album.artists[0].id,
        topTrackLists?.items[0].album.available_markets[0]
      )
      .then((data) => {
        setArtistTopTrackLists(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, topTrackLists]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    debouncedSearch(search);
  }, [search]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <Header />

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={
            search
              ? searchResults.tracks?.items[0]?.album?.images[0].url
              : topTrackLists?.items[0]?.album?.images[0].url
          }
          alt=""
        />
        <div>
          {search ? (
            <div>
              <p>TOP SEARCH</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {searchResults.tracks?.items[0]?.album?.artists[0].name}
              </h1>
            </div>
          ) : (
            <div>
              <p>TOP TRACKS</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {topTrackLists?.items[0].album?.artists[0].name}
              </h1>
            </div>
          )}
        </div>
      </section>

      <div>{search ? <TrackSearchResults /> : <TopTracks />}</div>
    </div>
  );
}

export default CenterSearch;
