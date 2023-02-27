import React from "react";

interface PropsNotEditableListedNote {
  listModeTextOfNote: string[] | JSX.Element[];
  noteHeader: string | JSX.Element;
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
    <div>
      <div>{props.noteHeader}</div>
      {listModeText}
    </div>
  );
}
