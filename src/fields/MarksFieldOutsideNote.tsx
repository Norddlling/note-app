import Mark from "../marks/Mark";
import CreateButton from "../buttons/CreateButton";
import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  switchNoteStatus,
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromAllNotes,
  holdMark,
  holdSelectedMark,
  holdShowAllMark,
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

  function addMark() {
    if (appData.searchMark !== "") {
      return (
        dispatch(addNewMark(appData.searchMark)),
        dispatch(markSearchbarUpdate(""))
      );
    }
  }

  function saveMark(index: number) {
    return dispatch(saveMarkIndex(index)), dispatch(holdSelectedMark());
  }

  function filterByMarks() {
    return dispatch(switchNoteStatus("filtered by marks"));
  }

  function resetMarksFilter() {
    return dispatch(switchNoteStatus("show all")), dispatch(holdShowAllMark());
  }

  function CloseMarksMenu() {
    return dispatch(hideMarksMenu());
  }

  function MarkInput(props: MarkInputProps) {
    return (
      <span>
        <input
          type="radio"
          className="py-2 px-1 align-middle"
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
        <div key={mark}>
          <Mark
            mark={mark}
            markClicked={filterByMarks}
            markInput={
              <MarkInput
                mark={mark}
                defaultChecked={appData.selectedMark === mark ? true : false}
              />
            }
            deleteMark={() => deleteThisMark(index)}
            clickOnMark={() => saveMark(index)}
            darkmode={props.darkmode}
          />
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
              className={" form-control shadow " + props.darkmode}
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
          <div className="m-1">
            <Button
              className={props.darkmode + "p-0 shadow"}
              onClick={resetMarksFilter}
            >
              <label className="px-2" htmlFor="showAll">
                <input
                  className="py-2 px-1 align-middle"
                  id="showAll"
                  type="radio"
                  name="filterMark"
                  value="Show all"
                  defaultChecked={
                    appData.marksStore.includes(appData.selectedMark)
                      ? false
                      : true
                  }
                />
                <span className="py-2 px-1 align-bottom">Show all</span>
              </label>
            </Button>
          </div>
          <div>{MarksValues}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
