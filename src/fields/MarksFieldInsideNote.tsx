import React from "react";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromNote,
  removeMarkFromAllNotes,
  holdMark,
  saveMarkIndex
} from "../features/dataStore/dataStoreSlice";

interface MatksFieldProps {
  markClicked: React.MouseEventHandler<HTMLDivElement>;
  darkmode: string;
  bgdarkmode: string;
}

export default function MarksFieldInsideNote(
  props: MatksFieldProps
): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  interface MarkInputProps {
    mark: string;
  }

  function findMarkValue(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(markSearchbarUpdate(event.target.value));
  }

  function deleteThisMark(index: number) {
    return (
      dispatch(saveMarkIndex(index)),
      dispatch(holdMark()),
      dispatch(removeMarkFromNote()),
      dispatch(removeMarkFromAllNotes()),
      dispatch(deleteMark())
    );
  }

  function addMark() {
    if (appData.searchMark !== "") {
      return (
        dispatch(addNewMark(appData.searchMark)),
        dispatch(markSearchbarUpdate(""))
      );
    }
  }

  function saveMark(index: number) {
    return dispatch(saveMarkIndex(index)), dispatch(holdMark());
  }

  function MarkInput(props: MarkInputProps) {
    return appData.notesStore[appData.noteIndex] !== undefined &&
      appData.notesStore[appData.noteIndex].marks.includes(props.mark) ? (
      <input
        type="checkbox"
        id={props.mark}
        className="py-3 px-1 cursor-pointer"
        name="marks"
        value={props.mark}
        defaultChecked
      />
    ) : (
      <input
        type="checkbox"
        id={props.mark}
        className="py-3 px-1 cursor-pointer "
        name="marks"
        value={props.mark}
      />
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark} className="d-flex mx-1 my-3">
          <div onClick={props.markClicked}>
            <div className="align-top" onClick={() => saveMark(index)}>
              {appData.tutorialMode ? (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip>
                      Add/remove <strong>{mark}</strong> mark in note.
                    </Tooltip>
                  }
                >
                  <Button className={props.darkmode + " shadow "}>
                    <MarkInput mark={mark} />
                    <span className="ms-2 align-top">{mark}</span>
                  </Button>
                </OverlayTrigger>
              ) : (
                <Button className={props.darkmode + " shadow "}>
                  <MarkInput mark={mark} />
                  <span className="ms-2 align-top">{mark}</span>
                </Button>
              )}
            </div>
          </div>
          {appData.tutorialMode ? (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  Delete <strong>{mark}</strong> mark. Also delete
                  <strong>{" " + mark}</strong> mark from all notes.
                </Tooltip>
              }
            >
              <div>
                <DeleteButton
                  darkmode={props.darkmode + " h-100 py-0 mx-1 shadow"}
                  delete={() => deleteThisMark(index)}
                />
              </div>
            </OverlayTrigger>
          ) : (
            <DeleteButton
              darkmode={props.darkmode + " h-100 py-0 mx-1 shadow"}
              delete={() => deleteThisMark(index)}
            />
          )}
        </div>
      )
    );
  });

  return (
    <div className={props.bgdarkmode}>
      <div className="input-group my-2">
        <input
          className={props.darkmode + " form-control form-control-lg shadow "}
          type="text"
          value={appData.searchMark}
          placeholder="Search marks"
          onChange={findMarkValue}
        />
        <CreateButton
          darkmode={props.darkmode + " h-100 shadow "}
          create={addMark}
        />
      </div>
      <div>{MarksValues}</div>
    </div>
  );
}
