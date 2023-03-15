import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  searchedNoteText
} from "../features/dataStore/dataStoreSlice";

export default function NoteSearchField(props: { darkmode: string }) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function filterNoteByText(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(searchedNoteText(event.target.value));
  }

  return (
    <div className={props.darkmode + " mb-3 shadow "}>
      <input
        className={" form-control input-text " + props.darkmode}
        value={appData.searchNote}
        placeholder="Search notes"
        onChange={filterNoteByText}
        type="search"
        id="noteSearchField"
        name="noteSearchField"
      />
    </div>
  );
}
