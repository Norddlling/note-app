import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface NoteTemplate {
  header: string;
  textOfNote: string;
  marks: string[];
  opened: boolean;
}

type StoreTypes = {
  notesStore: NoteTemplate[];
  noteIndex: number;
  noteStatus: string;
  noteStatusHolder: string;
  marksStore: string[];
  clickedMark: string;
  searchMark: string;
  openNote: boolean;
};

const initialState: StoreTypes = {
  notesStore: [],
  noteIndex: 0,
  noteStatus: "show all",
  noteStatusHolder: "",
  marksStore: [],
  clickedMark: "",
  searchMark: "",
  openNote: false
};

export const dataStoreSlice = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    switchNoteStatus: (state, action: PayloadAction<string>) => {
      state.noteStatus = action.payload;
    },
    openStoredNote: (state) => {
      state.notesStore[state.noteIndex].opened = true;
    },
    closeStoredNote: (state) => {
      state.notesStore[state.noteIndex].opened = false;
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
    deleteMark: (state, action: PayloadAction<number>) => {
      state.marksStore.splice(action.payload, 1);
    },
    removeMarkFromNote: (state) => {
      let deletedFromNoteMark = state.notesStore[state.noteIndex].marks.indexOf(
        state.clickedMark
      );
      state.notesStore[state.noteIndex].marks.splice(deletedFromNoteMark, 1);
    },
    saveNoteStatus: (state) => {
      state.noteStatusHolder = state.noteStatus;
    },
    holdMark: (state, action: PayloadAction<number>) => {
      state.clickedMark = state.marksStore[action.payload];
    },
    addMarkCreatedNote: (state) => {
      if (
        !state.notesStore[state.notesStore.length - 1].marks.includes(
          state.clickedMark
        )
      ) {
        state.notesStore[state.notesStore.length - 1].marks.push(
          state.clickedMark
        );
      }
    },
    addMarkOpenedNote: (state) => {
      if (
        !state.notesStore[state.noteIndex].marks.includes(state.clickedMark)
      ) {
        state.notesStore[state.noteIndex].marks.push(state.clickedMark);
      }
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
  saveNoteStatus,
  holdMark,
  addMarkCreatedNote,
  addMarkOpenedNote
} = dataStoreSlice.actions;
export const dataStore = (state: RootState) => state.savedData;
export default dataStoreSlice.reducer;

