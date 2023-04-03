import * as React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  switchNoteStatus,
  holdShowAllMark
} from "../features/dataStore/dataStoreSlice";

interface ShowAllMarksProps {
  darkmode: string;
}

export default function ShowAllMarks(props: ShowAllMarksProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function resetMarksFilter() {
    return dispatch(switchNoteStatus("show all")), dispatch(holdShowAllMark());
  }

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Show all notes</Tooltip>}
    >
      <Button
        className={props.darkmode + " px-0 pt-1 pb-0 shadow "}
        onClick={resetMarksFilter}
      >
        <label className="px-2" htmlFor="showAll">
          <input
            className="py-3 px-1 align-top cursor-pointer "
            id="showAll"
            type="radio"
            name="filterMark"
            value="Show all"
            defaultChecked={
              appData.marksStore.includes(appData.selectedMark) ? false : true
            }
          />
          <span className="py-3 px-1 align-bottom cursor-pointer ">
            Show all
          </span>
        </label>
      </Button>
    </OverlayTrigger>
  ) : (
    <Button
      className={props.darkmode + " px-0 pt-1 pb-0 shadow "}
      onClick={resetMarksFilter}
    >
      <label className="px-2" htmlFor="showAll">
        <input
          className="py-3 px-1 align-top cursor-pointer "
          id="showAll"
          type="radio"
          name="filterMark"
          value="Show all"
          defaultChecked={
            appData.marksStore.includes(appData.selectedMark) ? false : true
          }
        />
        <span className="py-3 px-1 align-bottom cursor-pointer ">Show all</span>
      </label>
    </Button>
  );
}
