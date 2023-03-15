import { Button } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

interface NotesViewButtonProps {
  changeViewOfNotes: React.MouseEventHandler<HTMLButtonElement>;
  darkmode: string;
}

export default function NotesViewButton(props: NotesViewButtonProps) {
  const appData = useAppSelector(dataStore);

  return (
    <span>
      <Button className={props.darkmode} onClick={props.changeViewOfNotes}>
        <span className={appData.notesTableView ? "glyphicon glyphicon-th-large py-1" : "glyphicon glyphicon-th-list py-1"}></span>
      </Button>
    </span>
  );
}