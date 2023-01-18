import React from "react";

interface NoteProps {
  headerValue: string;
  textOfNoteValue: string;
  headerOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  textOfNoteOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  showMarks?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Note(props: NoteProps) {
  return (
    <div>
      <div>
        <textarea
          value={props.headerValue}
          onChange={props.headerOnChange}
        ></textarea>
      </div>
      <div>
        <textarea
          value={props.textOfNoteValue}
          onChange={props.textOfNoteOnChange}
        ></textarea>
      </div>
      <button onClick={props.showMarks}>Marks</button>
    </div>
  );
}