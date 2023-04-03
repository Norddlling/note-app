import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface NoteProps {
  headerValue: string;
  textOfNoteValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  textOfNoteOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  darkmode: string;
  bgdarkmode: string;
}

export default function EditableNote(props: NoteProps) {
  const appData = useAppSelector(dataStore);

  return (
    <div className={props.darkmode}>
      {appData.tutorialMode ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Edit header of note.</Tooltip>}
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
      {appData.tutorialMode ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Edit text of note.</Tooltip>}
        >
          <textarea
            className={props.darkmode + " card-body "}
            rows={6}
            value={props.textOfNoteValue}
            onChange={props.textOfNoteOnChange}
          ></textarea>
        </OverlayTrigger>
      ) : (
        <textarea
          className={props.darkmode + " card-body "}
          rows={6}
          value={props.textOfNoteValue}
          onChange={props.textOfNoteOnChange}
        ></textarea>
      )}
    </div>
  );
}
