import React from "react";

interface NoteProps {
  headerValue: JSX.Element;
  textOfNoteValue: JSX.Element;
}

export default function NotEditableNote(props: NoteProps) {
  return (
    <div>
      <div>{props.headerValue}</div>
      <div>{props.textOfNoteValue}</div>
    </div>
  );
}
