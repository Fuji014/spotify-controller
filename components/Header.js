import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { currentSearchState } from "../atoms/searchAtom";

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useRecoilState(currentSearchState);
  return (
    <header>
      {router.pathname === "/Search" ? (
        <div className="absolute top-5 ml-5">
          <div className="flex items-center bg-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 text-gray-500 text-base">
            <SearchIcon className="h-5 w-5 text-gray-500" />
            <input
              className="focus:outline-none w-35"
              placeholder="Search Artists/Songs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}

export default Header;
