import React from "react";
import "./EditableListedNote.css";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  saveListTextOfNoteIndex,
  changeListTextOfNote,
  addParagraphInListedNote,
  deleteEnterFromNote,
  switchParagraphCheked
} from "../features/dataStore/dataStoreSlice";

interface EditableListedNoteProps {
  headerValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

interface PropsListedNoteParagraph {
  index: number;
  paragraph: string;
  className: string;
  defaultChecked: boolean;
}

export default function EditableListedNote(props: EditableListedNoteProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

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

  const ListedNoteParagraph = (props: PropsListedNoteParagraph) => {
    return (
      <div>
        <input
          type="checkbox"
          name="listCheck"
          defaultChecked={props.defaultChecked}
          onClick={() => clickOnListedParagraph(props.index)}
          onKeyPress={() => clickOnListedParagraph(props.index)}
          onChange={switchChecked}
        />
        <textarea
          className={props.className}
          value={props.paragraph}
          onClick={() => clickOnListedParagraph(props.index)}
          onKeyPress={() => clickOnListedParagraph(props.index)}
          onChange={changeListedParagraph}
        ></textarea>
      </div>
    );
  };

  const listModeText = appData.notesStore[
    appData.noteIndex
  ].listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        {paragraph.checked ? (
          <ListedNoteParagraph
            index={index}
            paragraph={paragraph.text}
            className="checkedParagraph"
            defaultChecked={true}
          />
        ) : (
          <ListedNoteParagraph
            index={index}
            paragraph={paragraph.text}
            className=""
            defaultChecked={false}
          />
        )}
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
