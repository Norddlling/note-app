import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface NoteTemplate {
  header: string;
  textOfNote: string;
  marks: string[];
  opened: boolean;
  listMode: boolean;
  listModeTextOfNote: { text: string; checked: boolean }[];
}

type StoreTypes = {
  notesStore: NoteTemplate[];
  noteIndex: number;
  noteStatus: string;
  noteStatusHolder: string;
  marksStore: string[];
  markIndex: number;
  clickedMark: string;
  searchMark: string;
  listTextOfNoteIndex: number;
  searchNote: string;
};

const initialState: StoreTypes = {
  notesStore: [],
  noteIndex: 0,
  noteStatus: "show all",
  noteStatusHolder: "",
  marksStore: [],
  markIndex: 0,
  clickedMark: "",
  searchMark: "",
  listTextOfNoteIndex: 0,
  searchNote: ""
};

export const dataStoreSlice = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    switchNoteStatus: (state, action: PayloadAction<string>) => {
      state.noteStatus = action.payload;
    },
    openStoredNote: (state) => {
      if (state.notesStore[state.noteIndex] !== undefined) {
        state.notesStore[state.noteIndex].opened = true;
      }
    },
    closeStoredNote: (state) => {
      if (state.notesStore[state.noteIndex] !== undefined) {
        state.notesStore[state.noteIndex].opened = false;
      }
    },
    addNote: (state, action: PayloadAction<NoteTemplate>) => {
      state.notesStore.push(action.payload);
    },
    createNoteHeader: (state, action: PayloadAction<string>) => {
      state.notesStore[state.notesStore.length - 1].header = action.payload;
    },
    createNoteTextOfNote: (state, action: PayloadAction<string>) => {
      state.notesStore[state.notesStore.length - 1].textOfNote = action.payload;
    },
    saveNoteIndex: (state, action: PayloadAction<number>) => {
      state.noteIndex = action.payload;
    },
    creatingNoteIndex: (state) => {
      if (state.notesStore.length > 0) {
        state.noteIndex = state.notesStore.length - 1;
      }
    },
    changeHeaderValue: (state, action: PayloadAction<string>) => {
      state.notesStore[state.noteIndex].header = action.payload;
    },
    changeTextOfNoteValue: (state, action: PayloadAction<string>) => {
      state.notesStore[state.noteIndex].textOfNote = action.payload;
    },
    deleteEmptyNote: (state) => {
      state.notesStore.pop();
    },
    deleteExistingNote: (state) => {
      state.notesStore.splice(state.noteIndex, 1);
    },
    markSearchbarUpdate: (state, action: PayloadAction<string>) => {
      state.searchMark = action.payload;
    },
    addNewMark: (state, action: PayloadAction<string>) => {
      state.marksStore.push(action.payload);
    },
    deleteMark: (state) => {
      state.marksStore.splice(state.markIndex, 1);
    },
    removeMarkFromNote: (state) => {
      if (state.notesStore.length > 0) {
        let deletedFromNoteMark = state.notesStore[
          state.noteIndex
        ].marks.indexOf(state.clickedMark);
        state.notesStore[state.noteIndex].marks.splice(deletedFromNoteMark, 1);
      }
    },
    removeMarkFromAllNotes: (state) => {
      state.notesStore.forEach((note) => {
        note.marks.forEach((mark) => {
          if (mark === state.clickedMark) {
            note.marks.splice(note.marks.indexOf(mark), 1);
          }
        });
      });
    },
    saveNoteStatus: (state) => {
      state.noteStatusHolder = state.noteStatus;
    },
    saveMarkIndex: (state, action: PayloadAction<number>) => {
      state.markIndex = action.payload;
    },
    holdMark: (state) => {
      state.clickedMark = state.marksStore[state.markIndex];
    },
    addMarkInsideNote: (state) => {
      if (
        state.notesStore[state.notesStore.length - 1] !== undefined &&
        !state.notesStore[state.noteIndex].marks.includes(state.clickedMark)
      ) {
        state.notesStore[state.noteIndex].marks.push(state.clickedMark);
      } else {
        state.notesStore[state.noteIndex].marks.splice(
          state.notesStore[state.noteIndex].marks.indexOf(state.clickedMark),
          1
        );
      }
    },
    switchListMode: (state) => {
      state.notesStore[state.noteIndex].listMode = !state.notesStore[
        state.noteIndex
      ].listMode;
    },
    saveListTextOfNoteIndex: (state, action: PayloadAction<number>) => {
      state.listTextOfNoteIndex = action.payload;
    },
    showListInNote: (state) => {
      if (state.notesStore[state.noteIndex].listMode) {
        state.notesStore[state.noteIndex].listModeTextOfNote = [];
        state.notesStore[state.noteIndex].textOfNote
          .split(/\n/)
          .forEach((paragraph) => {
            if (paragraph !== "") {
              return state.notesStore[state.noteIndex].listModeTextOfNote.push({
                text: paragraph,
                checked: false
              });
            }
          });
      } else {
        state.notesStore[state.noteIndex].textOfNote = "";
        state.notesStore[state.noteIndex].listModeTextOfNote.forEach(
          (paragraph) => {
            return (state.notesStore[
              state.noteIndex
            ].textOfNote += `${paragraph.text}\n`);
          }
        );
      }
    },
    changeListTextOfNote: (state, action: PayloadAction<string>) => {
      state.notesStore[state.noteIndex].listModeTextOfNote[
        state.listTextOfNoteIndex
      ].text = action.payload;
    },
    searchedNoteText: (state, action: PayloadAction<string>) => {
      state.searchNote = action.payload;
    },
    addParagraphInListedNote: (state) => {
      let paragraph =
        state.notesStore[state.noteIndex].listModeTextOfNote[
          state.listTextOfNoteIndex
        ];
      if (paragraph.text.endsWith(`\n`)) {
        state.notesStore[state.noteIndex].listModeTextOfNote.splice(
          state.listTextOfNoteIndex + 1,
          0,
          {
            text: "",
            checked: false
          }
        );
      }
    },
    deleteEnterFromNote: (state) => {
      let paragraph =
        state.notesStore[state.noteIndex].listModeTextOfNote[
          state.listTextOfNoteIndex
        ];
      if (paragraph.text.endsWith(`\n`)) {
        state.notesStore[state.noteIndex].listModeTextOfNote[
          state.listTextOfNoteIndex
        ].text = paragraph.text.slice(0, paragraph.text.length - 1);
      }
    },
    switchParagraphCheked: (state) => {
      state.notesStore[state.noteIndex].listModeTextOfNote[
        state.listTextOfNoteIndex
      ].checked = !state.notesStore[state.noteIndex].listModeTextOfNote[
        state.listTextOfNoteIndex
      ].checked;
    }
  }
});

export const {
  addNote,
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
  markSearchbarUpdate,
  addNewMark,
  deleteMark,
  removeMarkFromNote,
  removeMarkFromAllNotes,
  saveNoteStatus,
  holdMark,
  saveMarkIndex,
  creatingNoteIndex,
  addMarkInsideNote,
  switchListMode,
  saveListTextOfNoteIndex,
  showListInNote,
  changeListTextOfNote,
  searchedNoteText,
  addParagraphInListedNote,
  deleteEnterFromNote,
  switchParagraphCheked
} = dataStoreSlice.actions;
export const dataStore = (state: RootState) => state.savedData;
export default dataStoreSlice.reducer;
export { NoteTemplate };
