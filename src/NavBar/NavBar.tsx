import React from "react";
import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  showMarksMenu,
  changeNightMode
} from "../features/dataStore/dataStoreSlice";

interface NavBarProps {
  darkmode: string;
  bgdarkmode: string;
}

export default function Navbar(props: NavBarProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function marksMenuShow() {
    return dispatch(showMarksMenu());
  }

  function handleNightMode() {
    return dispatch(changeNightMode());
  }

  return (
    <nav className={"nav nav-pills nav-justified clearfix" + props.darkmode}>
      <Button className={props.darkmode + " shadow "} onClick={marksMenuShow}>
        <span className="glyphicon glyphicon-menu-hamburger"></span>
      </Button>
      <div className={"text-center nav-item p-2" + props.bgdarkmode}>
        Note App
      </div>
      {appData.darkMode ? (
        <Button
          className={props.darkmode + "float-end shadow"}
          onClick={handleNightMode}
        >
          <span className="fa fa-moon-o px-1"></span>
        </Button>
      ) : (
        <Button
          className={props.darkmode + "float-end shadow"}
          onClick={handleNightMode}
        >
          <span className="fa fa-sun-o px-1"></span>
        </Button>
      )}
    </nav>
  );
}
