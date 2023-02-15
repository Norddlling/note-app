import React from "react";

interface PropsListedNoteClosed {
  listModeTextOfNote: string[];
  noteHeader: string;
}

export default function ListedNoteClosed(props: PropsListedNoteClosed) {
  const listModeText = props.listModeTextOfNote.map((paragraph, index) => {
    return (
      <div key={index}>
        <textarea value={paragraph}></textarea>
      </div>
    );
  });

  return (
    <div>
      <div>
        <textarea value={props.noteHeader}></textarea>
      </div>
      <div>{listModeText}</div>
    </div>
  );
}
