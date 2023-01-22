import React from "react";

interface MarkProps {
  mark: string;
  deleteMark: React.MouseEventHandler<HTMLButtonElement>;
  clickOnMark: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Mark(props: MarkProps): JSX.Element {
  return (
    <div>
      <button onClick={props.clickOnMark}>{props.mark}</button>
      <button onClick={props.deleteMark}>Delete mark</button>
    </div>
  );
}
