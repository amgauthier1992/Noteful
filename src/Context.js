import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addNote: () => {},
});

export default Context;
