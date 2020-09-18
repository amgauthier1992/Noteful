import React from "react";
import { Link } from "react-router-dom";

export default function NotePage(props) {
  console.log(props.match.params.noteId);
  //currentNote is an array. we dont use filter here. we use find as it
  //returns 1 element/1 object. we dont want an array with 1 object. we
  //just want 1 object that represents the note with the current id
  //we want to display

  const currentNote = props.notes.find((note) => {
    if (note.id === props.match.params.noteId) {
      return note;
    }
  });

  //now that we found our "note" aka currentNote, we can now loop through
  //folders to also display the corresponding folder that matches the note's
  //folder id.
  const currentFolder = props.folders.find((folder) => {
    if (currentNote.folderId === folder.id) {
      return folder;
    }
  });
  return (
    <div className="content-container">
      <div className="Folder-Sidebar">
        <Link to="/">
          <button className="back-btn">Go Back</button>
        </Link>
        <div className="folder">
          <h2>{currentFolder.name}</h2>
        </div>
      </div>
      <div className="Note-section">
        <div className="note">
          <h2>{currentNote.name}</h2>
          <p>Date modified on: {currentNote.modified}</p>
          <button
            type="button"
            onClick={() => props.handleNoteDelete(props.id)}
          >
            Delete Note
          </button>
          <p>{currentNote.content}</p>
        </div>
      </div>
    </div>
  );
}
