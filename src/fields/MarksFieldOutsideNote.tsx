import Mark from "../marks/Mark";
import AddMarkButton from "../buttons/AddMarkButton";
import ShowAllMarks from "../buttons/ShowAllMarks";
import DeleteButton from "../buttons/DeleteButton";
import { Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  switchNoteStatus,
  markSearchbarUpdate,
  deleteMark,
  removeMarkFromAllNotes,
  holdMark,
  holdSelectedMark,
  saveMarkIndex,
  hideMarksMenu
} from "../features/dataStore/dataStoreSlice";

interface MarksFieldOutsideNoteProps {
  darkmode: string;
  bgdarkmode: string;
}

export default function MarksFieldOutsideNote(
  props: MarksFieldOutsideNoteProps
): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  interface MarkInputProps {
    mark: string;
    defaultChecked: boolean;
  }

  function findMarkValue(event: React.ChangeEvent<HTMLInputElement>) {
    return dispatch(markSearchbarUpdate(event.target.value));
  }

  function deleteThisMark(index: number) {
    return (
      dispatch(saveMarkIndex(index)),
      dispatch(holdMark()),
      dispatch(removeMarkFromAllNotes()),
      dispatch(deleteMark())
    );
  }

  function saveMark(index: number) {
    return dispatch(saveMarkIndex(index)), dispatch(holdSelectedMark());
  }

  function filterByMarks() {
    return dispatch(switchNoteStatus("filtered by marks"));
  }

  function CloseMarksMenu() {
    return dispatch(hideMarksMenu());
  }

  function MarkInput(props: MarkInputProps) {
    return (
      <span>
        <input
          type="radio"
          className="py-3 px-1 align-top cursor-pointer"
          id={props.mark}
          name="filterMark"
          value={props.mark}
          defaultChecked={props.defaultChecked}
        />
      </span>
    );
  }

  const MarksValues = appData.marksStore.map((mark, index) => {
    return (
      mark.includes(appData.searchMark) && (
        <div key={mark} className="d-flex mx-1 my-3">
          {appData.tutorialMode ? (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  Show notes with <strong>{mark}</strong> mark.
                </Tooltip>
              }
            >
              <div>
                <Mark
                  mark={mark}
                  markClicked={filterByMarks}
                  markInput={
                    <MarkInput
                      mark={mark}
                      defaultChecked={
                        appData.selectedMark === mark ? true : false
                      }
                    />
                  }
                  clickOnMark={() => saveMark(index)}
                  darkmode={props.darkmode}
                />
              </div>
            </OverlayTrigger>
          ) : (
            <Mark
              mark={mark}
              markClicked={filterByMarks}
              markInput={
                <MarkInput
                  mark={mark}
                  defaultChecked={appData.selectedMark === mark ? true : false}
                />
              }
              clickOnMark={() => saveMark(index)}
              darkmode={props.darkmode}
            />
          )}
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
    <div className="m-2 clearfix">
      <Offcanvas show={appData.showMarksMenu} onHide={CloseMarksMenu}>
        <Offcanvas.Header
          className={props.bgdarkmode}
          closeButton
          closeVariant={appData.darkMode ? "white" : "dark"}
        >
          <div className={"w-100"}></div>
        </Offcanvas.Header>
        <Offcanvas.Body className={props.bgdarkmode} id="marksMenuRoot">
          <div className="input-group my-3 mx-1 ">
            <input
              className={
                " form-control form-control-lg shadow " + props.darkmode
              }
              type="text"
              value={appData.searchMark}
              placeholder="Search marks"
              onChange={findMarkValue}
            />
            <AddMarkButton darkmode={props.darkmode} />
          </div>
          <div className="m-1 p-0">
            <ShowAllMarks darkmode={props.darkmode} />
          </div>
          <div>{MarksValues}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
