import React from "react";
import Note from "./Note";
import CloseNoteButton from "./CloseNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  addNote,
  switchNoteStatus,
  openStoredNote,
  closeStoredNote,
  createNoteHeader,
  createNoteTextOfNote,
  changeHeaderValue,
  changeHeaderIndex,
  changeTextOfNoteValue,
  changeTextOfNoteIndex,
  deleteEmptyNote,
  deleteExistingNote,
  dataStore
} from "../features/dataStore/dataStoreSlice";

export default function NotesField(): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function createNewNote() {
    return (
      dispatch(
        addNote({ header: "", textOfNote: "", marks: [], opened: false })
      ),
      dispatch(switchNoteStatus("creating"))
    );
  }

  function closeNote() {
    if (
      appData.notesStore[appData.notesStore.length - 1].header === "" &&
      appData.notesStore[appData.notesStore.length - 1].textOfNote !== ""
    ) {
      return alert("You mast create header of note");
    } else if (
      appData.notesStore[appData.notesStore.length - 1].header === "" &&
      appData.notesStore[appData.notesStore.length - 1].textOfNote === ""
    ) {
      return (
        dispatch(deleteEmptyNote()), dispatch(switchNoteStatus("show all"))
      );
    } else {
      return dispatch(switchNoteStatus("show all"));
    }
  }

  function addNAoteHeader(event: React.ChangeEvent<HTMLTextAreaElement>) {
    return dispatch(createNoteHeader(event.target.value));
  }

  function addTextOfNote(event: React.ChangeEvent<HTMLTextAreaElement>) {
    return dispatch(createNoteTextOfNote(event.target.value));
  }

  function openThisNote(index: number) {
    return dispatch(openStoredNote(index)), dispatch(switchNoteStatus("open"));
  }

  function closeThisNote(index: number) {
    if (appData.notesStore[index].header === "") {
      return alert("You mast create header of note");
    } else {
      return (
        dispatch(closeStoredNote(index)), dispatch(switchNoteStatus("show all"))
      );
    }
  }

  function changeHeader(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) {
    return (
      dispatch(changeHeaderValue(event.target.value)),
      dispatch(changeHeaderIndex(index))
    );
  }

  function changeTextOfNote(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) {
    return (
      dispatch(changeTextOfNoteValue(event.target.value)),
      dispatch(changeTextOfNoteIndex(index))
    );
  }

  function deleteSelectedNote(index: number) {
    return (
      dispatch(deleteExistingNote(index)),
      dispatch(switchNoteStatus("show all"))
    );
  }

  function deleteCreatingNote() {
    return dispatch(deleteEmptyNote()), dispatch(switchNoteStatus("show all"));
  }

  const createdNotes = appData.notesStore.map((note, index) => {
    const marksOfNotes = note.marks.map((mark) => {
      return <div key={mark}>{mark}</div>;
    });

    return (
      <div key={index}>
        <DeleteNoteButton deleteThisNote={() => deleteSelectedNote(index)} />
        <div
          onClick={() => openThisNote(index)}
          onKeyPress={() => openThisNote(index)}
        >
          <Note
            headerValue={note.header}
            textOfNoteValue={note.textOfNote}
            headerOnChange={(event) => changeHeader(event, index)}
            textOfNoteOnChange={(event) => changeTextOfNote(event, index)}
          />
          {marksOfNotes}
        </div>
        {appData.notesStore[index].opened && (
          <CloseNoteButton closeThisNote={() => closeThisNote(index)} />
        )}
      </div>
    );
  });

  const openedNote = appData.notesStore.map((note, index) => {
    return (
      note.opened === true && (
        <div key={index}>
          <DeleteNoteButton deleteThisNote={() => deleteSelectedNote(index)} />
          <Note
            headerValue={note.header}
            textOfNoteValue={note.textOfNote}
            headerOnChange={(event) => changeHeader(event, index)}
            textOfNoteOnChange={(event) => changeTextOfNote(event, index)}
          />
          <CloseNoteButton closeThisNote={() => closeThisNote(index)} />
        </div>
      )
    );
  });

  switch (appData.noteStatus) {
    case "show all":
      return (
        <div>
          <button onClick={createNewNote}>Create Note</button>
          {createdNotes}
        </div>
      );
    case "creating":
      return (
        <div>
          <DeleteNoteButton deleteThisNote={deleteCreatingNote} />
          <Note
            headerValue={
              appData.notesStore[appData.notesStore.length - 1].header
            }
            headerOnChange={addNAoteHeader}
            textOfNoteValue={
              appData.notesStore[appData.notesStore.length - 1].textOfNote
            }
            textOfNoteOnChange={addTextOfNote}
          />
          <button onClick={closeNote}>Close Note</button>
        </div>
      );
    case "open":
      return <div>{openedNote}</div>;
    default:
      return (
        <div>
          <button onClick={createNewNote}>Create Note</button>
          {createdNotes}
        </div>
      );
  }
}