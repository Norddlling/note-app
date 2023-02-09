import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface NoteTemplate {
  header: string;
  textOfNote: string;
  marks: MarkTemplate[];
  marksNames: string[];
  opened: boolean;
}

interface MarkTemplate {
  markName: string;
  selectedOutsideNote: boolean;
  selectedInsideNote: boolean;
}

type StoreTypes = {
  notesStore: NoteTemplate[];
  noteIndex: number;
  noteStatus: string;
  noteStatusHolder: string;
  marksStore: MarkTemplate[];
  marksNamesStore: string[];
  markIndex: number;
  clickedMark: MarkTemplate;
  searchMark: string;
  openNote: boolean;
};

const initialState: StoreTypes = {
  notesStore: [],
  noteIndex: 0,
  noteStatus: "show all",
  noteStatusHolder: "",
  marksStore: [],
  marksNamesStore: [],
  markIndex: 0,
  clickedMark: {
    markName: "",
    selectedOutsideNote: false,
    selectedInsideNote: false
  },
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
    addNewMark: (state, action: PayloadAction<MarkTemplate>) => {
      state.marksStore.push(action.payload);
    },
    addNewMarkName: (state, action: PayloadAction<string>) => {
      state.marksNamesStore.push(action.payload);
    },
    deleteMark: (state) => {
      state.marksStore.splice(state.markIndex, 1);
    },
    deleteMarkName: (state) => {
      state.marksNamesStore.splice(state.markIndex, 1);
    },
    removeMarkFromNote: (state) => {
      if (state.notesStore.length > 0) {
        let deletedFromNoteMark = state.notesStore[
          state.noteIndex
        ].marksNames.indexOf(state.clickedMark.markName);
        state.notesStore[state.noteIndex].marks.splice(deletedFromNoteMark, 1);
      }
    },
    removeMarkNameFromNote: (state) => {
      if (state.notesStore.length > 0) {
        let deletedFromNoteMark = state.notesStore[
          state.noteIndex
        ].marksNames.indexOf(state.clickedMark.markName);
        state.notesStore[state.noteIndex].marksNames.splice(
          deletedFromNoteMark,
          1
        );
      }
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
        !state.notesStore[state.noteIndex].marksNames.includes(
          state.clickedMark.markName
        )
      ) {
        state.notesStore[state.noteIndex].marks.push(state.clickedMark);
      } else {
        state.notesStore[state.noteIndex].marks.splice(
          state.notesStore[state.noteIndex].marksNames.indexOf(
            state.clickedMark.markName
          ),
          1
        );
      }
    },
    addMarkNameInsideNote: (state) => {
      if (
        state.notesStore[state.notesStore.length - 1] !== undefined &&
        !state.notesStore[state.noteIndex].marksNames.includes(
          state.clickedMark.markName
        )
      ) {
        state.notesStore[state.noteIndex].marksNames.push(
          state.clickedMark.markName
        );
      } else {
        state.notesStore[state.noteIndex].marksNames.splice(
          state.notesStore[state.noteIndex].marksNames.indexOf(
            state.clickedMark.markName
          ),
          1
        );
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
  addNewMarkName,
  deleteMark,
  deleteMarkName,
  removeMarkFromNote,
  removeMarkNameFromNote,
  saveNoteStatus,
  holdMark,
  saveMarkIndex,
  creatingNoteIndex,
  addMarkInsideNote,
  addMarkNameInsideNote
} = dataStoreSlice.actions;
export const dataStore = (state: RootState) => state.savedData;
export default dataStoreSlice.reducer;
export { NoteTemplate };
