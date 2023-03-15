import * as React from "react";
import { Button } from "react-bootstrap";

interface CreateButtonProps {
  create: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function CreateButton(props: CreateButtonProps) {
  return (
    <span>
      <Button className={props.darkmode + " shadow "} onClick={props.create}>
        <span className="glyphicon glyphicon-plus add-mark-icon"></span>
      </Button>
    </span>
  );
}
