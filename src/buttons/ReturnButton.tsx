import * as React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface ReturnButtonProps {
  return: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function ReturnButton(props: ReturnButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Return to note</Tooltip>}
    >
      <span>
        <Button className={props.darkmode} onClick={props.return}>
          <span className="glyphicon glyphicon-arrow-left"></span>
        </Button>
      </span>
    </OverlayTrigger>
  ) : (
    <span>
      <Button className={props.darkmode} onClick={props.return}>
        <span className="glyphicon glyphicon-arrow-left"></span>
      </Button>
    </span>
  );
}
