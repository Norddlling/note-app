import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface NotesViewButtonProps {
  changeViewOfNotes: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function NotesViewButton(props: NotesViewButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Toggle list/table view of notes</Tooltip>}
    >
      <span className="d-inline-block">
        <Button className={props.darkmode} onClick={props.changeViewOfNotes}>
          <span
            className={
              appData.notesTableView
                ? "glyphicon glyphicon-th-large py-1 custom-button"
                : "glyphicon glyphicon-th-list py-1 custom-button"
            }
          ></span>
        </Button>
      </span>
    </OverlayTrigger>
  ) : (
    <span className="d-inline-block">
      <Button className={props.darkmode} onClick={props.changeViewOfNotes}>
        <span
          className={
            appData.notesTableView
              ? "glyphicon glyphicon-th-large py-1 custom-button"
              : "glyphicon glyphicon-th-list py-1 custom-button"
          }
        ></span>
      </Button>
    </span>
  );
}
