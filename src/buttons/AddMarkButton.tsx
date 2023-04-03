import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateButton from "../buttons/CreateButton";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  addNewMark,
  markSearchbarUpdate
} from "../features/dataStore/dataStoreSlice";

interface AddMarkButtonProps {
  darkmode: string;
}

export default function AddMarkButton(props: AddMarkButtonProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function addMark() {
    if (appData.searchMark !== "") {
      return (
        dispatch(addNewMark(appData.searchMark)),
        dispatch(markSearchbarUpdate(""))
      );
    }
  }

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Add new mark from input field.</Tooltip>}
    >
      <div>
        <CreateButton
          darkmode={props.darkmode + " h-100 shadow "}
          create={addMark}
        />
      </div>
    </OverlayTrigger>
  ) : (
    <CreateButton
      darkmode={props.darkmode + " h-100 shadow "}
      create={addMark}
    />
  );
}
