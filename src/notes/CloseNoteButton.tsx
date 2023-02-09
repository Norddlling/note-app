import * as React from "react";

interface CloseNoteButtonProps {
  closeThisNote: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CloseNoteButton(props: CloseNoteButtonProps) {
  return (
    <div>
      <button onClick={props.closeThisNote}>Close opened note</button>
    </div>
  );
}
