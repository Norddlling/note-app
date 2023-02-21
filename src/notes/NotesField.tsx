import React from "react";
import EditableNote from "./EditableNote";
import NotEditableNote from "./NotEditableNote";
import EditableListedNote from "./EditableListedNote";
import NotEditableListedNote from "./NotEditableListedNote";
import CloseNoteButton from "./CloseNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import MarksFieldInsideNote from "./MarksFieldInsideNote";
import NoteSearchField from "./NoteSearchField";
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
  switchListMode,
  showListInNote,
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
          opened: false,
          listMode: false,
          listModeTextOfNote: []
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
    return dispatch(addMarkInsideNote());
  }

  function changeListMode() {
    return dispatch(switchListMode()), dispatch(showListInNote());
  }

  const marksValues = (note: NoteTemplate) => {
    return note.marks.map((mark) => {
      return <div key={mark}>{mark}</div>;
    });
  };

  const highlitedHeader = (note: NoteTemplate) => {
    return note.header
      .toLowerCase()
      .includes(appData.searchNote.toLowerCase()) &&
      appData.searchNote !== "" ? (
      <p>
        <span>
          {note.header
            .toLowerCase()
            .slice(0, note.header.indexOf(appData.searchNote.toLowerCase()))}
        </span>
        <mark>{appData.searchNote}</mark>
        <span>
          {note.header
            .toLowerCase()
            .slice(
              note.header.indexOf(appData.searchNote.toLowerCase()) +
                appData.searchNote.length
            )}
        </span>
      </p>
    ) : (
      <p>{note.header}</p>
    );
  };

  const highlitedTextOfNote = (note: NoteTemplate) => {
    return note.textOfNote
      .toLowerCase()
      .includes(appData.searchNote.toLowerCase()) &&
      appData.searchNote !== "" ? (
      <p>
        <span>
          {note.textOfNote
            .toLowerCase()
            .slice(
              0,
              note.textOfNote.indexOf(appData.searchNote.toLowerCase())
            )}
        </span>
        <mark>{appData.searchNote}</mark>
        <span>
          {note.textOfNote.slice(
            note.textOfNote
              .toLowerCase()
              .indexOf(appData.searchNote.toLowerCase()) +
              appData.searchNote.length
          )}
        </span>
      </p>
    ) : (
      <p>{note.textOfNote}</p>
    );
  };

  const highlitedListModeTextOfNote = (note: NoteTemplate) => {
    return note.listModeTextOfNote.map((paragraph) => {
      return (
        <div key={paragraph}>
          {paragraph.toLowerCase().includes(appData.searchNote.toLowerCase()) &&
          appData.searchNote !== "" ? (
            <p>
              <span>
                {paragraph
                  .toLowerCase()
                  .slice(
                    0,
                    paragraph.indexOf(appData.searchNote.toLowerCase())
                  )}
              </span>
              <mark>{appData.searchNote}</mark>
              <span>
                {paragraph.slice(
                  paragraph
                    .toLowerCase()
                    .indexOf(appData.searchNote.toLowerCase()) +
                    appData.searchNote.length
                )}
              </span>
            </p>
          ) : (
            <p>{paragraph}</p>
          )}
        </div>
      );
    });
  };

  const createdNotes = appData.notesStore.map((note, index) => {
    const marksOfNotes = marksValues(note);
    const highlitedNoteHeader = highlitedHeader(note);
    const highlitedNoteTextOfNote = highlitedTextOfNote(note);
    const highlitedListModeNote = highlitedListModeTextOfNote(note);

    return (
      <div key={index}>
        {(note.header
          .toLowerCase()
          .includes(appData.searchNote.toLowerCase()) ||
          note.textOfNote
            .toLowerCase()
            .includes(appData.searchNote.toLowerCase()) ||
          note.listModeTextOfNote.includes(
            appData.searchNote.toLowerCase()
          )) && (
          <div>
            <DeleteNoteButton
              deleteThisNote={() => deleteSelectedNote(index)}
            />
            <div onClick={openThisNote} onKeyPress={openThisNote}>
              <div
                onClick={() => rememberOpenedNote(index)}
                onKeyPress={() => rememberOpenedNote(index)}
              >
                {note.listMode ? (
                  <NotEditableListedNote
                    noteHeader={highlitedNoteHeader}
                    listModeTextOfNote={highlitedListModeNote}
                  />
                ) : (
                  <NotEditableNote
                    headerValue={highlitedNoteHeader}
                    textOfNoteValue={highlitedNoteTextOfNote}
                  />
                )}
                {marksOfNotes}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

  const openedNote = appData.notesStore.map((note, index) => {
    const marksOfNotes = marksValues(note);

    return (
      note.opened === true && (
        <div key={index}>
          <DeleteNoteButton deleteThisNote={() => deleteSelectedNote(index)} />
          {appData.notesStore[appData.noteIndex].listMode ? (
            <EditableListedNote
              headerValue={note.header}
              headerOnChange={changeHeader}
            />
          ) : (
            <EditableNote
              headerValue={note.header}
              textOfNoteValue={note.textOfNote}
              headerOnChange={changeHeader}
              textOfNoteOnChange={changeTextOfNote}
            />
          )}
          <button onClick={changeListMode}>List</button>
          {marksOfNotes}
          <button onClick={showMarksField}>Marks</button>
          <CloseNoteButton closeThisNote={closeThisNote} />
        </div>
      )
    );
  });

  const filteredNotes = appData.notesStore.map((note, index) => {
    const marksOfNotes = marksValues(note);
    const highlitedNoteHeader = highlitedHeader(note);
    const highlitedNoteTextOfNote = highlitedTextOfNote(note);
    const highlitedListModeNote = highlitedListModeTextOfNote(note);

    return (
      note.marks.includes(appData.marksStore[appData.markIndex]) && (
        <div key={index}>
          {(note.header.includes(appData.searchNote) ||
            note.textOfNote.includes(appData.searchNote) ||
            note.listModeTextOfNote.includes(appData.searchNote)) && (
            <div>
              <DeleteNoteButton
                deleteThisNote={() => deleteSelectedNote(index)}
              />
              <div onClick={openThisNote} onKeyPress={openThisNote}>
                <div
                  onClick={() => rememberOpenedNote(index)}
                  onKeyPress={() => rememberOpenedNote(index)}
                >
                  {note.listMode ? (
                    <NotEditableListedNote
                      noteHeader={highlitedNoteHeader}
                      listModeTextOfNote={highlitedListModeNote}
                    />
                  ) : (
                    <NotEditableNote
                      headerValue={highlitedNoteHeader}
                      textOfNoteValue={highlitedNoteTextOfNote}
                    />
                  )}
                  {marksOfNotes}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    );
  });

  switch (appData.noteStatus) {
    case "show all":
      return (
        <div>
          <NoteSearchField />
          <button onClick={createNewNote}>Create Note</button>
          {createdNotes}
        </div>
      );
    case "creating":
      const marksOfNotes = appData.notesStore[
        appData.notesStore.length - 1
      ].marks.map((mark) => {
        return <div key={mark}>{mark}</div>;
      });
      return (
        <div>
          <DeleteNoteButton deleteThisNote={deleteCreatingNote} />
          <EditableNote
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
          <MarksFieldInsideNote markClicked={addMarkInNote} />
        </div>
      );
    case "filtered by marks":
      return (
        <div>
          <NoteSearchField />
          <button onClick={createNewNote}>Create Note</button>
          {filteredNotes}
        </div>
      );
    default:
      return (
        <div>
          <NoteSearchField />
          <button onClick={createNewNote}>Create Note</button>
          {createdNotes}
        </div>
      );
  }
}
