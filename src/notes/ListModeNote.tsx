import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  saveListTextOfNoteIndex,
  changeListTextOfNote
} from "../features/dataStore/dataStoreSlice";

interface ListModeNoteProps {
  headerValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function ListModeNote(props: ListModeNoteProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function clickOnListedParagraph(index: number) {
    return dispatch(saveListTextOfNoteIndex(index));
  }

  function changeListedParagraph(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    return dispatch(changeListTextOfNote(event.target.value));
  }

  const listModeText = appData.notesStore[
    appData.noteIndex
  ].listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        <textarea
          value={paragraph}
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
