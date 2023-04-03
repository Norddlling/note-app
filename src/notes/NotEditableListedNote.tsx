import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface PropsNotEditableListedNote {
  listModeTextOfNote: string[] | JSX.Element[];
  noteHeader: string | JSX.Element;
  darkmode: string;
}

export default function NotEditableListedNote(
  props: PropsNotEditableListedNote
) {
  const appData = useAppSelector(dataStore);

  const listModeText = props.listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        <div>{paragraph}</div>
      </div>
    );
  });

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Click or tap to open this note</Tooltip>}
    >
      <div className={props.darkmode}>
        <div className="card-header">{props.noteHeader}</div>
        <div className="card-body noteeditablenote-size">{listModeText}</div>
      </div>
    </OverlayTrigger>
  ) : (
    <div className={props.darkmode}>
      <div className="card-header">{props.noteHeader}</div>
      <div className="card-body noteeditablenote-size">{listModeText}</div>
    </div>
  );
}
