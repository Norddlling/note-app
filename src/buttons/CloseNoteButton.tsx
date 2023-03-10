import React from "react";
import { Button } from "react-bootstrap";

interface CloseNoteButtonProps {
  closeThisNote: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function CloseNoteButton(props: CloseNoteButtonProps) {
  return (
    <span>
      <Button className={props.darkmode} onClick={props.closeThisNote}>
        <span className="glyphicon glyphicon-remove"></span>
      </Button>
    </span>
  );
}
