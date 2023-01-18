import React from "react";
import "./styles.css";
import NotesField from "./notes/NotesField";
import MarksField from "./notes/MarksField";

export default function App() {
  return (
    <main>
      <MarksField />
      <NotesField />
    </main>
  );
}
