import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  searchedNoteText
} from "../features/dataStore/dataStoreSlice";

export default function NoteSearchField() {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function filterNoteByText(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(searchedNoteText(event.target.value));
  }

  return (
    <div>
      <input
        value={appData.searchNote}
        onChange={filterNoteByText}
        type="search"
        id="noteSearchField"
        name="noteSearchField"
      />
    </div>
  );
}
