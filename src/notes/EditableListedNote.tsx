import React, { useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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

interface EditableListedNoteProps {
  headerValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  darkmode: string;
  bgdarkmode: string;
}

export default function EditableListedNote(props: EditableListedNoteProps) {
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
    appData.noteIndex
  ].listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index} className={props.darkmode + "d-flex"}>
        {appData.tutorialMode ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Mark/unmark the paragraph as complete</Tooltip>}
          >
            <input
              type="checkbox"
              name="listCheck"
              defaultChecked={paragraph.checked ? true : false}
              onClick={() => clickOnListedParagraph(index)}
              onKeyPress={() => clickOnListedParagraph(index)}
              onChange={switchChecked}
            />
          </OverlayTrigger>
        ) : (
          <input
            type="checkbox"
            name="listCheck"
            defaultChecked={paragraph.checked ? true : false}
            onClick={() => clickOnListedParagraph(index)}
            onKeyPress={() => clickOnListedParagraph(index)}
            onChange={switchChecked}
          />
        )}
        {appData.tutorialMode ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit paragraph</Tooltip>}
          >
            <textarea
              className={
                props.darkmode +
                " border-0 " +
                (paragraph.checked ? " checkedParagraph " : " ")
              }
              value={paragraph.text}
              onClick={() => clickOnListedParagraph(index)}
              onKeyPress={() => clickOnListedParagraph(index)}
              onChange={changeListedParagraph}
            ></textarea>
          </OverlayTrigger>
        ) : (
          <textarea
            className={
              props.darkmode +
              " border-0 " +
              (paragraph.checked ? " checkedParagraph " : " ")
            }
            value={paragraph.text}
            onClick={() => clickOnListedParagraph(index)}
            onKeyPress={() => clickOnListedParagraph(index)}
            onChange={changeListedParagraph}
          ></textarea>
        )}
      </div>
    );
  });

  return (
    <div className={props.darkmode}>
      {appData.tutorialMode ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Edit header of note</Tooltip>}
        >
          <textarea
            className={props.darkmode + " card-header "}
            rows={3}
            value={props.headerValue}
            onChange={props.headerOnChange}
          ></textarea>
        </OverlayTrigger>
      ) : (
        <textarea
          className={props.darkmode + " card-header "}
          rows={3}
          value={props.headerValue}
          onChange={props.headerOnChange}
        ></textarea>
      )}
      <div className="card-body">{listModeText}</div>
    </div>
  );
}
