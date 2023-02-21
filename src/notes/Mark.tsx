import React from "react";

interface MarkProps {
  mark: string;
  deleteMark: React.MouseEventHandler<HTMLButtonElement>;
  clickOnMark: React.MouseEventHandler<HTMLButtonElement>;
  markClicked: React.MouseEventHandler<HTMLDivElement>;
  markInput: JSX.Element;
}

export default function Mark(props: MarkProps): JSX.Element {
  return (
    <div>
      <div onClick={props.markClicked}>
        <button onClick={props.clickOnMark}>
          <label>
            {props.markInput}
            <p>{props.mark}</p>
          </label>
        </button>
      </div>
      <button onClick={props.deleteMark}>Delete mark</button>
    </div>
  );
}
