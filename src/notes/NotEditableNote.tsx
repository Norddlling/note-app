import React from "react";

interface NoteProps {
  headerValue: JSX.Element;
  textOfNoteValue: JSX.Element;
  darkmode: string;
}

export default function NotEditableNote(props: NoteProps) {
  return (
    <div className={props.darkmode}>
      <div className="card-header">{props.headerValue}</div>
      <div className="card-body noteeditablenote-size">
        {props.textOfNoteValue}
      </div>
    </div>
  );
}
