import React from "react";
import Mark from "./Mark";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  switchNoteStatus,
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromAllNotes,
  holdMark,
  saveMarkIndex
} from "../features/dataStore/dataStoreSlice";

export default function MarksFieldOutsideNote(): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  interface MarkInputProps {
    mark: string;
  }

  function findMarkValue(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(markSearchbarUpdate(event.target.value));
  }

  function deleteThisMark(index: number) {
    return (
      dispatch(saveMarkIndex(index)),
      dispatch(holdMark()),
      dispatch(removeMarkFromAllNotes()),
      dispatch(deleteMark())
    );
  }

  function addMark() {
    if (appData.searchMark !== "") {
      return (
        dispatch(addNewMark(appData.searchMark)),
        dispatch(markSearchbarUpdate(""))
      );
    }
  }

  function saveMark(index: number) {
    return dispatch(saveMarkIndex(index));
  }

  function filterByMarks() {
    return dispatch(switchNoteStatus("filtered by marks"));
  }

  function resetMarksFilter() {
    return dispatch(switchNoteStatus("show all"));
  }

  function MarkInput(props: MarkInputProps) {
    return (
      <div>
        <input
          type="radio"
          id={props.mark}
          name="filterMark"
          value={props.mark}
        />
      </div>
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark}>
          <Mark
            mark={mark}
            markClicked={filterByMarks}
            markInput={<MarkInput mark={mark} />}
            deleteMark={() => deleteThisMark(index)}
            clickOnMark={() => saveMark(index)}
          />
        </div>
      )
    );
  });

  return (
    <div>
      {(appData.noteStatus === "show all" ||
        appData.noteStatus === "filtered by marks") && (
        <div>
          <div>
            <input
              type="text"
              value={appData.searchMark}
              onChange={findMarkValue}
            />
          </div>
          <button onClick={resetMarksFilter}>
            <label>
              <input type="radio" name="filterMark" value="Show all" />
              <span>Show all</span>
            </label>
          </button>
          <div>{MarksValues}</div>
          <div>
            <button onClick={addMark}>Add new mark</button>
          </div>
        </div>
      )}
    </div>
  );
}
