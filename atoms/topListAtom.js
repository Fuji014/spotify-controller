import { atom } from "recoil";

export const topTrackslistsState = atom({
  key: "topTrackLists",
  default: null,
});

export const artistTopTrackslistsState = atom({
  key: "artistTopTrackLists",
  default: null,
});
