import * as React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface ListModeButtonProps {
  changeListMode: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function ListModeButton(props: ListModeButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Enable/disable list style in note</Tooltip>}
    >
      <span>
        <Button className={props.darkmode} onClick={props.changeListMode}>
          List
        </Button>
      </span>
    </OverlayTrigger>
  ) : (
    <span>
      <Button className={props.darkmode} onClick={props.changeListMode}>
        List
      </Button>
    </span>
  );
}
