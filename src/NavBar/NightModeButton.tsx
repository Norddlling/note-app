import React from "react";
import { Button } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  changeNightMode
} from "../features/dataStore/dataStoreSlice";

interface NightModeButtonProps {
  darkmode: string;
}

export default function NightModeButton(props: NightModeButtonProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function handleNightMode() {
    return dispatch(changeNightMode());
  }

  return appData.darkMode ? (
    appData.tutorialMode ? (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Disable night mode.</Tooltip>}
      >
        <Button
          className={props.darkmode + "float-end shadow"}
          onClick={handleNightMode}
        >
          <span className="fa fa-moon-o py-1 custom-button"></span>
        </Button>
      </OverlayTrigger>
    ) : (
      <Button
        className={props.darkmode + "float-end shadow"}
        onClick={handleNightMode}
      >
        <span className="fa fa-moon-o py-1 custom-button"></span>
      </Button>
    )
  ) : appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Enable night mode.</Tooltip>}
    >
      <Button
        className={props.darkmode + "float-end shadow"}
        onClick={handleNightMode}
      >
        <span className="fa fa-sun-o py-1 custom-button"></span>
      </Button>
    </OverlayTrigger>
  ) : (
    <Button
      className={props.darkmode + "float-end shadow"}
      onClick={handleNightMode}
    >
      <span className="fa fa-sun-o py-1 custom-button"></span>
    </Button>
  );
}
