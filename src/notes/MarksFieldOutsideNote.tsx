import React from "react";
import Mark from "./Mark";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  markSearchbarUpdate,
  addNewMark,
  addNewMarkName,
  deleteMark,
  deleteMarkName,
  removeMarkFromNote,
  removeMarkNameFromNote,
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
      dispatch(deleteMark()),
      dispatch(deleteMarkName())
    );
  }

  function addMark() {
    if (appData.searchMark !== "") {
      return (
        dispatch(
          addNewMark({
            markName: appData.searchMark,
            selectedOutsideNote: false,
            selectedInsideNote: false
          })
        ),
        dispatch(addNewMarkName(appData.searchMark)),
        dispatch(markSearchbarUpdate(""))
      );
    }
  }

  function saveMark(index: number) {
    return dispatch(saveMarkIndex(index));
  }

  function MarkInput(props: MarkInputProps) {
    return (
      <div>
        <input type="radio" id={props.mark} name="test" value={props.mark} />
      </div>
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.markName.includes(appData.searchMark) && (
        <div key={mark.markName}>
          <Mark
            mark={mark.markName}
            //markClicked={() => appData.noteStatus}
            markInput={<MarkInput mark={mark.markName} />}
            deleteMark={() => deleteThisMark(index)}
            clickOnMark={() => saveMark(index)}
          />
        </div>
      )
    );
  });

  return (
    <div>
      {appData.noteStatus === "show all" && (
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
      )}
    </div>
  );
}
