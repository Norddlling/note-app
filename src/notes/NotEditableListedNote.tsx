import React from "react";

interface PropsNotEditableListedNote {
  listModeTextOfNote: string[] | JSX.Element[];
  noteHeader: string | JSX.Element;
  darkmode: string;
}

export default function NotEditableListedNote(
  props: PropsNotEditableListedNote
) {
  const listModeText = props.listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        <div>{paragraph}</div>
      </div>
    );
  });

  return (
    <div className={props.darkmode}>
      <div className="card-header">{props.noteHeader}</div>
      <div className="card-body">{listModeText}</div>
    </div>
  );
}
