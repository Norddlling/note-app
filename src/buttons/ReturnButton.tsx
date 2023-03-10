import * as React from "react";
import { Button } from "react-bootstrap";

interface ReturnButtonProps {
  return: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function ReturnButton(props: ReturnButtonProps) {
  return (
    <span>
      <Button className={props.darkmode} onClick={props.return}>
        <span className="glyphicon glyphicon-arrow-left"></span>
      </Button>
    </span>
  );
}