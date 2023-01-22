import React from "react";
import "./styles.css";
import NotesField from "./notes/NotesField";
import MarksFieldOutsideNote from "./notes/MarksFieldOutsideNote";

export default function App() {
  return (
    <main>
      <MarksFieldOutsideNote />
      <NotesField />
    </main>
  );
}
