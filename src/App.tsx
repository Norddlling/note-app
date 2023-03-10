import React from "react";
import "./styles.css";
import NavBar from "./NavBar/NavBar";
import NotesField from "./fields/NotesField";
import MarksFieldOutsideNote from "./fields/MarksFieldOutsideNote";
import { useAppSelector } from "./app/hooks";
import { dataStore } from "./features/dataStore/dataStoreSlice";

export default function App() {
  const appData = useAppSelector(dataStore);
  const darkmode = appData.darkMode
    ? " bg-dark text-light border-light btn-outline-light "
    : " bg-light text-dark border-dark btn-outline-dark ";
  const bgdarkmode = appData.darkMode
    ? " bg-dark text-light border-light btn-outline-light "
    : " light-bg-color text-dark border-dark btn-outline-dark ";

  return (
    <div className={bgdarkmode} id="appRoot">
      <div className="m-4">
        <NavBar bgdarkmode={bgdarkmode} darkmode={darkmode} />
        <main>
          <MarksFieldOutsideNote bgdarkmode={bgdarkmode} darkmode={darkmode} />
          <NotesField bgdarkmode={bgdarkmode} darkmode={darkmode} />
        </main>
      </div>
    </div>
  );
}
