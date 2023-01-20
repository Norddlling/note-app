import React from "react";
import MarksField from "./MarksField";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { dataStore } from "../features/dataStore/dataStoreSlice";

export default function MarksFieldOutsideNote(): JSX.Element {
  const appData = useAppSelector(dataStore);
  const dispatch = useAppDispatch();

  return <div>{appData.noteStatus === "show all" && <MarksField />}</div>;
}