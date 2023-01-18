import React from "react";
import Mark from "./Mark";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  outsideNoteAddMark,
  markSearchbarUpdate
} from "../features/dataStore/dataStoreSlice";

export default function MarksField(): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark}>
          <Mark mark={mark} />
        </div>
      )
    );
  });

  function addMark(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(markSearchbarUpdate(event.target.value));
  }

  return (
    <div>
      <div>
        <input type="text" value={appData.searchMark} onChange={addMark} />
      </div>
      <div>{MarksValues}</div>
      <div>
        <button>Add new mark</button>
      </div>
    </div>
  );
}