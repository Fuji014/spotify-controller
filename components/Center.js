import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "../components/Songs";
import Header from "../components/Header";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import {
  currentSearchResultsState,
  currentSearchState,
} from "../atoms/searchAtom";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const [searchResults, setSearchResults] = useRecoilState(
    currentSearchResultsState
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
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

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
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
