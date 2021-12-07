import { getSession } from "next-auth/react";
import CenterSearch from "../components/CenterSearch";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Search() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <CenterSearch />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
