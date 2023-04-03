import React from "react";
import EditableNote from "../notes/EditableNote";
import NotEditableNote from "../notes/NotEditableNote";
import EditableListedNote from "../notes/EditableListedNote";
import CreatingListedNote from "../notes/CreatingListedNote";
import NotEditableListedNote from "../notes/NotEditableListedNote";
import ListModeButton from "../buttons/ListModeButton";
import CloseNoteButton from "../buttons/CloseNoteButton";
import DeleteNoteButton from "../buttons/DeleteNoteButton";
import MarksButton from "../buttons/MarksButton";
import CreateNoteButton from "../buttons/CreateNoteButton";
import ReturnButton from "../buttons/ReturnButton";
import NotesViewButton from "../buttons/NotesViewButton";
import MarksFieldInsideNote from "./MarksFieldInsideNote";
import NoteSearchField from "./NoteSearchField";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  dataStore,
  switchNoteStatus,
  openStoredNote,
  closeStoredNote,
  createNoteHeader,
  createNoteTextOfNote,
  saveNoteIndex,
  changeHeaderValue,
  changeTextOfNoteValue,
  deleteEmptyNote,
  deleteExistingNote,
  saveNoteStatus,
  addMarkInsideNote,
  switchListMode,
  showListInNote,
  NoteTemplate,
  changeNotesView
} from "../features/dataStore/dataStoreSlice";

interface NotesFieldProps {
  darkmode: string;
  bgdarkmode: string;
}

export default function NotesField(props: NotesFieldProps): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

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

  function paragraphIncludes(paragraph: { text: string; checked: boolean }) {
    return paragraph.text.includes(appData.searchNote.toLowerCase());
  }

  function changeViewOfNotes() {
    return dispatch(changeNotesView());
  }

  const marksValues = (note: NoteTemplate) => {
    return note.marks.map((mark) => {
      return (
        <div className="d-inline-block mx-2" key={mark}>
          {mark}
        </div>
      );
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
        <div key={paragraph.text}>
          {paragraph.text
            .toLowerCase()
            .includes(appData.searchNote.toLowerCase()) &&
          appData.searchNote !== "" ? (
            <p>
              <span>
                {paragraph.text
                  .toLowerCase()
                  .slice(
                    0,
                    paragraph.text.indexOf(appData.searchNote.toLowerCase())
                  )}
              </span>
              <mark>{appData.searchNote}</mark>
              <span>
                {paragraph.text.slice(
                  paragraph.text
                    .toLowerCase()
                    .indexOf(appData.searchNote.toLowerCase()) +
                    appData.searchNote.length
                )}
              </span>
            </p>
          ) : (
            <p className={paragraph.checked ? "checkedParagraph" : ""}>
              {paragraph.checked ? (
                <span className="glyphicon glyphicon-check"></span>
              ) : (
                <span className="glyphicon glyphicon-unchecked"></span>
              )}
              {paragraph.text}
            </p>
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
      <div
        key={index}
        className={appData.notesTableView ? "min-size-note-table-view" : ""}
      >
        {(note.header
          .toLowerCase()
          .includes(appData.searchNote.toLowerCase()) ||
          note.textOfNote
            .toLowerCase()
            .includes(appData.searchNote.toLowerCase()) ||
          note.listModeTextOfNote.some((paragraph) =>
            paragraphIncludes(paragraph)
          )) && (
          <div
            className={
              appData.notesTableView
                ? props.darkmode + "my-3 clearfix card shadow "
                : props.darkmode + " my-3 clearfix card shadow "
            }
          >
            <div className={"d-flex justify-content-end"}>
              {appData.tutorialMode ? (
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Delete this note</Tooltip>}
                >
                  <span
                    className="material-icons d-inline-block p-2 cursor-pointer"
                    id="deleteNoteIcon"
                    onClick={() => deleteSelectedNote(index)}
                  >
                    delete
                  </span>
                </OverlayTrigger>
              ) : (
                <span
                  className="material-icons d-inline-block p-2 cursor-pointer"
                  id="deleteNoteIcon"
                  onClick={() => deleteSelectedNote(index)}
                >
                  elete
                </span>
              )}
            </div>
            <div onClick={openThisNote} onKeyPress={openThisNote}>
              <div
                onClick={() => rememberOpenedNote(index)}
                onKeyPress={() => rememberOpenedNote(index)}
              >
                {note.listMode ? (
                  <NotEditableListedNote
                    darkmode={props.darkmode}
                    noteHeader={highlitedNoteHeader}
                    listModeTextOfNote={highlitedListModeNote}
                  />
                ) : (
                  <NotEditableNote
                    darkmode={props.darkmode}
                    headerValue={highlitedNoteHeader}
                    textOfNoteValue={highlitedNoteTextOfNote}
                  />
                )}
                <div className="card-footer">{marksOfNotes}</div>
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
          <div className={props.darkmode + "card shadow"}>
            <div className={"clearfix"}>
              <CloseNoteButton closeNote={closeThisNote} />
              <DeleteNoteButton deleteNote={() => deleteSelectedNote(index)} />
            </div>
            {appData.notesStore[appData.noteIndex].listMode ? (
              <EditableListedNote
                headerValue={note.header}
                darkmode={props.darkmode}
                bgdarkmode={props.bgdarkmode}
                headerOnChange={changeHeader}
              />
            ) : (
              <EditableNote
                darkmode={props.darkmode}
                bgdarkmode={props.bgdarkmode}
                headerValue={note.header}
                textOfNoteValue={note.textOfNote}
                headerOnChange={changeHeader}
                textOfNoteOnChange={changeTextOfNote}
              />
            )}
            <div className="card-footer">{marksOfNotes}</div>
          </div>
          <ListModeButton
            darkmode={props.darkmode + " my-2 me-1 shadow "}
            changeListMode={changeListMode}
          />
          <MarksButton
            darkmode={props.darkmode + " my-2 mx-1 shadow "}
            showMarksField={showMarksField}
          />
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
      note.marks.indexOf(appData.marksStore[appData.markIndex]) >= 0 && (
        <div
          key={index}
          className={appData.notesTableView ? "min-size-note-table-view" : ""}
        >
          {(note.header.includes(appData.searchNote) ||
            note.textOfNote.includes(appData.searchNote) ||
            note.listModeTextOfNote.some((paragraph) =>
              paragraphIncludes(paragraph)
            )) && (
            <div
              className={
                appData.notesTableView
                  ? props.darkmode + "my-3 clearfix card shadow "
                  : props.darkmode + " my-3 clearfix card shadow "
              }
            >
              <div className="d-flex justify-content-end">
                {appData.tutorialMode ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Delete this note</Tooltip>}
                  >
                    <span
                      className="material-icons d-inline-block p-2 cursor-pointer"
                      id="deleteNoteIcon"
                      onClick={() => deleteSelectedNote(index)}
                    >
                      delete
                    </span>
                  </OverlayTrigger>
                ) : (
                  <span
                    className="material-icons d-inline-block p-2 cursor-pointer"
                    id="deleteNoteIcon"
                    onClick={() => deleteSelectedNote(index)}
                  >
                    delete
                  </span>
                )}
              </div>
              <div onClick={openThisNote} onKeyPress={openThisNote}>
                <div
                  onClick={() => rememberOpenedNote(index)}
                  onKeyPress={() => rememberOpenedNote(index)}
                >
                  {note.listMode ? (
                    <NotEditableListedNote
                      darkmode={props.darkmode}
                      noteHeader={highlitedNoteHeader}
                      listModeTextOfNote={highlitedListModeNote}
                    />
                  ) : (
                    <NotEditableNote
                      darkmode={props.darkmode}
                      headerValue={highlitedNoteHeader}
                      textOfNoteValue={highlitedNoteTextOfNote}
                    />
                  )}
                  <div className="card-footer">{marksOfNotes}</div>
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
        <div className="clearfix">
          <NoteSearchField darkmode={props.darkmode} />
          <div>
            <CreateNoteButton darkmode={props.darkmode} />
            <span className=" float-end notes-view-button-visibility">
              <NotesViewButton
                darkmode={props.darkmode + " shadow "}
                changeViewOfNotes={changeViewOfNotes}
              />
            </span>
          </div>
          <div
            className={
              appData.notesTableView
                ? "table-view-notes-layout notes-field-maxwith"
                : "notes-list-view-layout"
            }
          >
            {createdNotes}
          </div>
        </div>
      );
    case "creating":
      const marksOfNotes = appData.notesStore[
        appData.notesStore.length - 1
      ].marks.map((mark) => {
        return (
          <div className="d-inline-block mx-2" key={mark}>
            {mark}
          </div>
        );
      });
      return (
        <div>
          <div className={props.darkmode + "card shadow"}>
            <div className="clearfix">
              <CloseNoteButton closeNote={closeNote} />
              <DeleteNoteButton deleteNote={deleteCreatingNote} />
            </div>
            {appData.notesStore[appData.notesStore.length - 1].listMode ? (
              <CreatingListedNote
                darkmode={props.darkmode}
                bgdarkmode={props.bgdarkmode}
                headerValue={
                  appData.notesStore[appData.notesStore.length - 1].header
                }
                headerOnChange={addNAoteHeader}
              />
            ) : (
              <EditableNote
                darkmode={props.darkmode}
                bgdarkmode={props.bgdarkmode}
                headerValue={
                  appData.notesStore[appData.notesStore.length - 1].header
                }
                headerOnChange={addNAoteHeader}
                textOfNoteValue={
                  appData.notesStore[appData.notesStore.length - 1].textOfNote
                }
                textOfNoteOnChange={addTextOfNote}
              />
            )}
            <div className="card-footer">{marksOfNotes}</div>
          </div>
          <ListModeButton
            darkmode={props.darkmode + " my-2 me-1 shadow "}
            changeListMode={changeListMode}
          />
          <MarksButton
            darkmode={props.darkmode + " my-2 mx-1 shadow "}
            showMarksField={showMarksField}
          />
        </div>
      );
    case "open":
      return <div>{openedNote}</div>;
    case "add mark":
      return (
        <div>
          <div className="d-flex">
            <ReturnButton
              darkmode={props.darkmode + " shadow "}
              return={returnFromMarks}
            />
            <span className="p-2 text-break">
              {appData.notesStore[appData.noteIndex].header}
            </span>
          </div>
          <MarksFieldInsideNote
            darkmode={props.darkmode}
            bgdarkmode={props.bgdarkmode}
            markClicked={addMarkInNote}
          />
        </div>
      );
    case "filtered by marks":
      return (
        <div>
          <NoteSearchField darkmode={props.darkmode} />
          <div>
            <CreateNoteButton darkmode={props.darkmode} />
            <span className=" float-end notes-view-button-visibility">
              <NotesViewButton
                darkmode={props.darkmode + " shadow "}
                changeViewOfNotes={changeViewOfNotes}
              />
            </span>
          </div>
          <div
            className={
              appData.notesTableView
                ? "table-view-notes-layout notes-field-maxwith"
                : "notes-list-view-layout"
            }
          >
            {filteredNotes}
          </div>
        </div>
      );
    default:
      return (
        <div>
          <NoteSearchField darkmode={props.darkmode} />
          <div>
            <CreateNoteButton darkmode={props.darkmode} />
            <span className=" float-end notes-view-button-visibility ">
              <NotesViewButton
                darkmode={props.darkmode + " shadow "}
                changeViewOfNotes={changeViewOfNotes}
              />
            </span>
          </div>
          <div
            className={
              appData.notesTableView
                ? "table-view-notes-layout notes-field-maxwith"
                : "notes-list-view-layout"
            }
          >
            {createdNotes}
          </div>
        </div>
      );
  }
}
