import React from "react";
import MarksMenuButton from "./MarksMenuButton";
import NightModeButton from "./NightModeButton";
import QuestionSimbol from "./QuestionSimbol";

interface NavBarProps {
  darkmode: string;
  bgdarkmode: string;
}

export default function Navbar(props: NavBarProps) {
  return (
    <nav className={"nav nav-pills nav-justified clearfix" + props.darkmode}>
      <MarksMenuButton darkmode={props.darkmode} />
      <div className={"text-center nav-item app-name" + props.bgdarkmode}>
        Note App
        <QuestionSimbol />
      </div>
      <NightModeButton darkmode={props.darkmode} />
    </nav>
  );
}
