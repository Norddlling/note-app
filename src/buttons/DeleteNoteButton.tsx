import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface DeleteNoteButtonProps {
  deleteNote: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteNoteButton(props: DeleteNoteButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Delete this note.</Tooltip>}
    >
      <span
        className="material-icons d-inline-block float-end p-2 cursor-pointer"
        id="deleteNoteIcon"
        onClick={props.deleteNote}
      >
        delete
      </span>
    </OverlayTrigger>
  ) : (
    <span
      className="material-icons d-inline-block float-end p-2 cursor-pointer"
      id="deleteNoteIcon"
      onClick={props.deleteNote}
    >
      delete
    </span>
  );
}
