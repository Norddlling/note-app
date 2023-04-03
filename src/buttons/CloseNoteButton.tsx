import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface CloseNoteButtonProps {
  closeNote: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CloseNoteButton(props: CloseNoteButtonProps) {
  const appData = useAppSelector(dataStore);

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Close this note.</Tooltip>}
    >
      <span
        className="glyphicon glyphicon-remove d-inline-block p-2 cursor-pointer"
        onClick={props.closeNote}
      ></span>
    </OverlayTrigger>
  ) : (
    <span
      className="glyphicon glyphicon-remove d-inline-block p-2 cursor-pointer"
      onClick={props.closeNote}
    ></span>
  );
}
