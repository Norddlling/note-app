import * as React from "react";

interface DeleteNoteButtonProps {
  deleteThisNote: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteNoteButton(props: DeleteNoteButtonProps) {
  return (
    <div>
      <button onClick={props.deleteThisNote}>Delete note</button>
    </div>
  );
}