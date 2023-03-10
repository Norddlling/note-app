import * as React from "react";
import { Button } from "react-bootstrap";

interface MarksButtonProps {
  showMarksField: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function MarksButton(props: MarksButtonProps) {
  return (
    <span>
      <Button className={props.darkmode} onClick={props.showMarksField}>
        Marks
      </Button>
    </span>
  );
}
