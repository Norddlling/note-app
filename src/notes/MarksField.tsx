import React from "react";
import Mark from "./Mark";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromNote,
  holdMark
} from "../features/dataStore/dataStoreSlice";

interface MatksFieldProps {
  markClicked: React.MouseEventHandler<HTMLDivElement>;
}

export default function MarksField(props: MatksFieldProps): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function findMarkValue(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(markSearchbarUpdate(event.target.value));
  }

  function deleteThisMark(index: number) {
    return (
      dispatch(holdMark(index)),
      dispatch(removeMarkFromNote()),
      dispatch(deleteMark(index))
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
    return dispatch(holdMark(index));
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark}>
          <Mark
            mark={mark}
            markClicked={props.markClicked}
            deleteMark={() => deleteThisMark(index)}
            clickOnMark={() => saveMark(index)}
          />
        </div>
      )
    );
  });

  return (
    <div>
      <div>
        <input
          type="text"
          value={appData.searchMark}
          onChange={findMarkValue}
        />
      </div>
      <div>{MarksValues}</div>
      <div>
        <button onClick={addMark}>Add new mark</button>
      </div>
    </div>
  );
}
