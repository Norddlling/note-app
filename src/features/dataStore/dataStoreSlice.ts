import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface NoteTemplate {
  header: string;
  textOfNote: string;
  marks?: string[];
  opened: boolean;
}

type StoreTypes = {
  notesStore: NoteTemplate[];
  noteStatus: string;
  marksStore: string[];
  searchMark: string;
  openNote: boolean;
  changedText: string;
};

const initialState: StoreTypes = {
  notesStore: [],
  noteStatus: "show all",
  marksStore: [],
  searchMark: "",
  openNote: false,
  changedText: ""
};

export const dataStoreSlice = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    switchNoteStatus: (state, action: PayloadAction<string>) => {
      state.noteStatus = action.payload;
    },
    openStoredNote: (state, action: PayloadAction<number>) => {
      state.notesStore[action.payload].opened = true;
    },
    closeStoredNote: (state, action: PayloadAction<number>) => {
      state.notesStore[action.payload].opened = false;
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
    changeHeaderValue: (state, action: PayloadAction<string>) => {
      state.changedText = action.payload;
    },
    changeHeaderIndex: (state, action: PayloadAction<number>) => {
      state.notesStore[action.payload].header = state.changedText;
    },
    changeTextOfNoteValue: (state, action: PayloadAction<string>) => {
      state.changedText = action.payload;
    },
    changeTextOfNoteIndex: (state, action: PayloadAction<number>) => {
      state.notesStore[action.payload].textOfNote = state.changedText;
    },
    deleteEmptyNote: (state) => {
      state.notesStore.pop();
    },
    deleteExistingNote: (state, action: PayloadAction<number>) => {
      state.notesStore.splice(action.payload, 1);
    },
    markSearchbarUpdate: (state, action: PayloadAction<string>) => {
      state.searchMark = action.payload;
    },
    outsideNoteAddMark: (state, action: PayloadAction<string>) => {
      state.marksStore.push(action.payload);
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
  changeHeaderValue,
  changeHeaderIndex,
  changeTextOfNoteValue,
  changeTextOfNoteIndex,
  deleteEmptyNote,
  deleteExistingNote,
  markSearchbarUpdate,
  outsideNoteAddMark
} = dataStoreSlice.actions;
export const dataStore = (state: RootState) => state.savedData;
export default dataStoreSlice.reducer;