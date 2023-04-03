import React from "react";
import { Button } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { dataStore, showMarksMenu } from "../features/dataStore/dataStoreSlice";

interface MarksMenuButtonProps {
  darkmode: string;
}

export default function MarksMenuButton(props: MarksMenuButtonProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function marksMenuShow() {
    return dispatch(showMarksMenu());
  }

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip>
          Show side menu with marks. You can sort notes by marks.
        </Tooltip>
      }
    >
      <Button className={props.darkmode + " shadow "} onClick={marksMenuShow}>
        <span className="glyphicon glyphicon-menu-hamburger py-1 custom-button "></span>
      </Button>
    </OverlayTrigger>
  ) : (
    <Button className={props.darkmode + " shadow "} onClick={marksMenuShow}>
      <span className="glyphicon glyphicon-menu-hamburger py-1 custom-button "></span>
    </Button>
  );
}
