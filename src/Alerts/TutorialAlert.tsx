import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  enableTutorialMode,
  disableTutorialMode,
  disableTutorialAlert
} from "../features/dataStore/dataStoreSlice";
import "bootstrap/dist/css/bootstrap.min.css";

interface TutorialModalProps {
  darkmode: string;
}

export default function TutorialAlert(props: TutorialModalProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function closeModal() {
    return dispatch(disableTutorialAlert());
  }

  function turnOffTips() {
    return dispatch(disableTutorialMode()), dispatch(disableTutorialAlert());
  }

  function showTips() {
    return dispatch(enableTutorialMode()), dispatch(disableTutorialAlert());
  }

  return appData.tutorialAlert ? (
    <div className="custom-alert-div w-100 h-100 " onClick={closeModal}>
      <Card className={props.darkmode + " custom-alert mx-auto mt-4 shadow"}>
        <Card.Body>
          <Card.Text>
            <p>Do you want see tips how to use application?</p>
            <p>
              You can disable it any time by pressing on icon
              <span className="ms-2 fa fa-question-circle-o"></span> at top of
              the app.
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className={props.darkmode} onClick={showTips}>
            Show tips
          </Button>
          <Button
            className={props.darkmode + " float-end"}
            onClick={turnOffTips}
          >
            Hide tips
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ) : (
    <div></div>
  );
}
