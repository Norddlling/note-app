import React from "react";
import { Button } from "react-bootstrap";

interface MarkProps {
  mark: string;
  clickOnMark: React.MouseEventHandler<HTMLButtonElement>;
  markClicked: React.MouseEventHandler<HTMLDivElement>;
  markInput: JSX.Element;
  darkmode: string;
}

export default function Mark(props: MarkProps): JSX.Element {
  return (
    <div>
      <div onClick={props.markClicked}>
        <Button
          className={props.darkmode + " px-0 pt-1 pb-0 shadow "}
          onClick={props.clickOnMark}
        >
          <label className="px-2" htmlFor={props.mark}>
            {props.markInput}
            <span className="py-3 px-1 align-bottom cursor-pointer">
              {props.mark}
            </span>
          </label>
        </Button>
      </div>
    </div>
  );
}
