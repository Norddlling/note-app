import React from "react";

interface NoteProps {
  headerValue: string;
  textOfNoteValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  textOfNoteOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  darkmode: string;
  bgdarkmode: string;
}

export default function EditableNote(props: NoteProps) {
  return (
    <div className={props.darkmode}>
      <textarea
        className={props.darkmode + " card-header "}
        rows={3}
        value={props.headerValue}
        onChange={props.headerOnChange}
      ></textarea>
      <textarea
        className={props.darkmode + " card-body "}
        rows={6}
        value={props.textOfNoteValue}
        onChange={props.textOfNoteOnChange}
      ></textarea>
    </div>
  );
}
