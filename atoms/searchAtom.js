import { atom } from "recoil";

export const currentSearchState = atom({
  key: "search", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const currentSearchResultsState = atom({
  key: "searchResults", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
