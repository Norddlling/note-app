import React from "react";
import Mark from "../marks/Mark";
import CreateButton from "../buttons/CreateButton";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromNote,
  removeMarkFromAllNotes,
  holdMark,
  saveMarkIndex
} from "../features/dataStore/dataStoreSlice";

interface MatksFieldProps {
  markClicked: React.MouseEventHandler<HTMLDivElement>;
  darkmode: string;
  bgdarkmode: string;
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
    return dispatch(saveMarkIndex(index)), dispatch(holdMark());
  }

  function MarkInput(props: MarkInputProps) {
    return appData.notesStore[appData.noteIndex] !== undefined &&
      appData.notesStore[appData.noteIndex].marks.includes(props.mark) ? (
      <input
        type="checkbox"
        id={props.mark}
        name="marks"
        value={props.mark}
        defaultChecked
      />
    ) : (
      <input type="checkbox" id={props.mark} name="marks" value={props.mark} />
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark}>
          <Mark
            mark={mark}
            markClicked={props.markClicked}
            markInput={<MarkInput mark={mark} />}
            deleteMark={() => deleteThisMark(index)}
            clickOnMark={() => saveMark(index)}
            darkmode={props.darkmode}
          />
        </div>
      )
    );
  });

  return (
    <div className={props.bgdarkmode}>
      <div className="input-group my-2">
        <input
          className={" form-control  shadow " + props.darkmode}
          type="text"
          value={appData.searchMark}
          placeholder="Search marks"
          onChange={findMarkValue}
        />
        <CreateButton
          darkmode={props.darkmode + " h-100 shadow "}
          create={addMark}
        />
      </div>
      <div>{MarksValues}</div>
    </div>
  );
}
