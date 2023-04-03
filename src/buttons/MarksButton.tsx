import * as React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface MarksButtonProps {
  showMarksField: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function MarksButton(props: MarksButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          Show menu with marks. You can add mark to note and sort note by marks
        </Tooltip>
      }
    >
      <span>
        <Button className={props.darkmode} onClick={props.showMarksField}>
          Marks
        </Button>
      </span>
    </OverlayTrigger>
  ) : (
    <span>
      <Button className={props.darkmode} onClick={props.showMarksField}>
        Marks
      </Button>
    </span>
  );
}
