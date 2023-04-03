import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  toggleTutorialMode
} from "../features/dataStore/dataStoreSlice";

export default function QuestionSimbol() {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function switchTutorialMode() {
    return dispatch(toggleTutorialMode());
  }

  return appData.tutorialMode ? (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Hide tips.</Tooltip>}>
      <span
        className={
          appData.tutorialMode
            ? "ms-2 fa fa-question-circle-o"
            : "ms-2 fa fa-question-circle"
        }
        onClick={switchTutorialMode}
      ></span>
    </OverlayTrigger>
  ) : (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Show tips.</Tooltip>}>
      <span
        className={
          appData.tutorialMode
            ? "ms-2 fa fa-question-circle-o"
            : "ms-2 fa fa-question-circle"
        }
        onClick={switchTutorialMode}
      ></span>
    </OverlayTrigger>
  );
}
