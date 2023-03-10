import * as React from "react";
import { Button } from "react-bootstrap";

interface DeleteNoteButtonProps {
  delete: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function DeleteButton(props: DeleteNoteButtonProps) {
  return (
    <span>
      <Button className={props.darkmode} onClick={props.delete}>
        <span className="material-icons" id="deleteIcon">
          delete
        </span>
      </Button>
    </span>
  );
}
