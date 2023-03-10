import * as React from "react";
import { Button } from "react-bootstrap";

interface ListModeButtonProps {
  changeListMode: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function ListModeButton(props: ListModeButtonProps) {
  return (
    <span>
      <Button className={props.darkmode} onClick={props.changeListMode}>
        List
      </Button>
    </span>
  );
}
