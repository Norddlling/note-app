import React, { useEffect } from "react";
import "./EditableListedNote.css";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  saveListTextOfNoteIndex,
  changeListTextOfNote,
  addParagraphInListedNote,
  deleteEnterFromNote,
  switchParagraphCheked,
  deleteEmptyParagraph
} from "../features/dataStore/dataStoreSlice";

interface CreatingleListedNoteProps {
  headerValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function CreatingListedNote(props: CreatingleListedNoteProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(deleteEmptyParagraph());
  }, [appData.notesStore[appData.noteIndex].listModeTextOfNote]);

  function clickOnListedParagraph(index: number) {
    return dispatch(saveListTextOfNoteIndex(index));
  }

  function changeListedParagraph(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    return (
      dispatch(changeListTextOfNote(event.target.value)),
      dispatch(addParagraphInListedNote()),
      dispatch(deleteEnterFromNote())
    );
  }

  function switchChecked() {
    dispatch(switchParagraphCheked());
  }

  const listModeText = appData.notesStore[
    appData.notesStore.length - 1
  ].listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        <input
          type="checkbox"
          name="listCheck"
          defaultChecked={paragraph.checked ? true : false}
          onClick={() => clickOnListedParagraph(index)}
          onKeyPress={() => clickOnListedParagraph(index)}
          onChange={switchChecked}
        />
        <textarea
          className={paragraph.checked ? "checkedParagraph" : ""}
          value={paragraph.text}
          onClick={() => clickOnListedParagraph(index)}
          onKeyPress={() => clickOnListedParagraph(index)}
          onChange={changeListedParagraph}
        ></textarea>
      </div>
    );
  });

  return (
    <div>
      <div>
        <textarea
          value={props.headerValue}
          onChange={props.headerOnChange}
        ></textarea>
      </div>
      <div>{listModeText}</div>
    </div>
  );
}
