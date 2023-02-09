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

interface MatksFieldProps {
  markClicked: React.MouseEventHandler<HTMLDivElement>;
  //noteStatus: string;
}

export default function MarksFieldInsideNote(
  props: MatksFieldProps
): JSX.Element {
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
      dispatch(removeMarkFromNote()),
      dispatch(removeMarkNameFromNote()),
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
    return dispatch(saveMarkIndex(index)), dispatch(holdMark());
  }

  function MarkInput(props: MarkInputProps) {
    return appData.notesStore[appData.noteIndex] !== undefined &&
      appData.notesStore[appData.noteIndex].marksNames.includes(props.mark) ? (
      <input
        type="checkbox"
        id={props.mark}
        name="marks"
        value={props.mark}
        checked
      />
    ) : (
      <input type="checkbox" id={props.mark} name="marks" value={props.mark} />
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.markName.includes(appData.searchMark) && (
        <div key={mark.markName}>
          <Mark
            mark={mark.markName}
            markClicked={props.markClicked}
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
