import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface NoteProps {
  headerValue: JSX.Element;
  textOfNoteValue: JSX.Element;
  darkmode: string;
}

export default function NotEditableNote(props: NoteProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Click or tap to open this note</Tooltip>}
    >
      <div className={props.darkmode}>
        <div className="card-header">{props.headerValue}</div>
        <div className="card-body noteeditablenote-size">
          {props.textOfNoteValue}
        </div>
      </div>
    </OverlayTrigger>
  ) : (
    <div className={props.darkmode}>
      <div className="card-header">{props.headerValue}</div>
      <div className="card-body noteeditablenote-size">
        {props.textOfNoteValue}
      </div>
    </div>
  );
}
