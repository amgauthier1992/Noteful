import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addNote: () => {},
  addFolder: () => {},
});

export default Context;
