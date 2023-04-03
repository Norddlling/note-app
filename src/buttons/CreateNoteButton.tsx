import CreateButton from "../buttons/CreateButton";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  addNote,
  creatingNoteIndex,
  switchNoteStatus
} from "../features/dataStore/dataStoreSlice";

interface CreateNoteButtonProps {
  darkmode: string;
}

export default function CreateNoteButton(props: CreateNoteButtonProps) {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function createNewNote() {
    return (
      dispatch(
        addNote({
          header: "",
          textOfNote: "",
          marks: [],
          opened: false,
          listMode: false,
          listModeTextOfNote: []
        })
      ),
      dispatch(creatingNoteIndex()),
      dispatch(switchNoteStatus("creating"))
    );
  }

  return appData.tutorialMode ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>Create new note.</Tooltip>}
    >
      <span className="d-inline-block">
        <CreateButton
          darkmode={props.darkmode + " create-note-button "}
          create={createNewNote}
        />
      </span>
    </OverlayTrigger>
  ) : (
    <CreateButton
      darkmode={props.darkmode + " create-note-button "}
      create={createNewNote}
    />
  );
}
