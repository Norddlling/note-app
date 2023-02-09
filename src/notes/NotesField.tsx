import React from "react";
import Note from "./Note";
import CloseNoteButton from "./CloseNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import MarksFieldInsideNote from "./MarksFieldInsideNote";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  addNote,
  switchNoteStatus,
  openStoredNote,
  closeStoredNote,
  createNoteHeader,
  createNoteTextOfNote,
  saveNoteIndex,
  creatingNoteIndex,
  changeHeaderValue,
  changeTextOfNoteValue,
  deleteEmptyNote,
  deleteExistingNote,
  dataStore,
  saveNoteStatus,
  addMarkInsideNote,
  addMarkNameInsideNote,
  NoteTemplate
} from "../features/dataStore/dataStoreSlice";

export default function NotesField(): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  function createNewNote() {
    return (
      dispatch(
        addNote({
          header: "",
          textOfNote: "",
          marks: [],
          marksNames: [],
          opened: false
        })
      ),
      dispatch(creatingNoteIndex()),
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

  function rememberOpenedNote(index: number) {
    return dispatch(saveNoteIndex(index));
  }

  function openThisNote() {
    return dispatch(openStoredNote()), dispatch(switchNoteStatus("open"));
  }

  function closeThisNote() {
    if (appData.notesStore[appData.noteIndex].header === "") {
      return alert("You mast create header of note");
    } else {
      return (
        dispatch(closeStoredNote()), dispatch(switchNoteStatus("show all"))
      );
    }
  }

  function changeHeader(event: React.ChangeEvent<HTMLTextAreaElement>) {
    return dispatch(changeHeaderValue(event.target.value));
  }

  function changeTextOfNote(event: React.ChangeEvent<HTMLTextAreaElement>) {
    return dispatch(changeTextOfNoteValue(event.target.value));
  }

  function deleteSelectedNote(index: number) {
    return (
      dispatch(saveNoteIndex(index)),
      dispatch(deleteExistingNote()),
      dispatch(switchNoteStatus("show all"))
    );
  }

  function deleteCreatingNote() {
    return dispatch(deleteEmptyNote()), dispatch(switchNoteStatus("show all"));
  }

  function showMarksField() {
    return dispatch(saveNoteStatus()), dispatch(switchNoteStatus("add mark"));
  }

  function returnFromMarks() {
    return dispatch(switchNoteStatus(appData.noteStatusHolder));
  }

  function addMarkInNote() {
    return dispatch(addMarkInsideNote()), dispatch(addMarkNameInsideNote());
  }

  const marksValues = (note: NoteTemplate) => {
    return note.marks.map((mark) => {
      return <div key={mark.markName}>{mark.markName}</div>;
    });
  };

  const createdNotes = appData.notesStore.map((note, index) => {
    const marksOfNotes = marksValues(note);

    return (
      <div key={index}>
        <DeleteNoteButton deleteThisNote={() => deleteSelectedNote(index)} />
        <div onClick={openThisNote} onKeyPress={openThisNote}>
          <div
            onClick={() => rememberOpenedNote(index)}
            onKeyPress={() => rememberOpenedNote(index)}
          >
            <Note
              headerValue={note.header}
              textOfNoteValue={note.textOfNote}
              headerOnChange={changeHeader}
              textOfNoteOnChange={changeTextOfNote}
            />
            {marksOfNotes}
          </div>
          {appData.notesStore[index].opened && (
            <CloseNoteButton closeThisNote={closeThisNote} />
          )}
        </div>
      </div>
    );
  });

  const openedNote = appData.notesStore.map((note, index) => {
    const marksOfNotes = marksValues(note);

    return (
      note.opened === true && (
        <div key={index}>
          <DeleteNoteButton deleteThisNote={() => deleteSelectedNote(index)} />
          <Note
            headerValue={note.header}
            textOfNoteValue={note.textOfNote}
            headerOnChange={changeHeader}
            textOfNoteOnChange={changeTextOfNote}
          />
          {marksOfNotes}
          <button onClick={showMarksField}>Marks</button>
          <CloseNoteButton closeThisNote={closeThisNote} />
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
      const marksOfNotes = appData.notesStore[
        appData.notesStore.length - 1
      ].marks.map((mark) => {
        return <div key={mark.markName}>{mark.markName}</div>;
      });
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
          <div>{marksOfNotes}</div>
          <button onClick={showMarksField}>Marks</button>
          <button onClick={closeNote}>Close Note</button>
        </div>
      );
    case "open":
      return <div>{openedNote}</div>;
    case "add mark":
      return (
        <div>
          <div>
            <button onClick={returnFromMarks}>Return to note</button>
          </div>
          <MarksFieldInsideNote
            markClicked={addMarkInNote}
            //noteStatus={appData.noteStatus}
          />
        </div>
      );
    default:
      return (
        <div>
          <button onClick={createNewNote}>Create Note</button>
          {createdNotes}
        </div>
      );
  }
}
