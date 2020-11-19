import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import config from "./config"
// import propTypes from "prop-types";

function deleteNoteRequest(noteId, callback) {
  fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.API_KEY}`
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res //we dont return res.json() here since it's a delete
    })
    .then(() => {
      callback(noteId);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function NotePage(props) {
  console.log(props.match.params.noteId);
  //currentNote is an array. we dont use filter here. we use find as it
  //returns 1 element/1 object. we dont want an array with 1 object. we
  //just want 1 object that represents the note with the current id
  //we want to display

  return (
    <Context.Consumer>
      {(context) => {
        const currentNote = context.notes.find((note) => {
          //noteId from line 149 of app.js
          if (note.id === Number(props.match.params.noteId)) {
            return note;
          }
        });
        //now that we found our "note" aka currentNote, we can now loop through
        //folders to also display the corresponding folder that matches the note's
        //folder id.
        const currentFolder = context.folders.find((folder) => {
          if (currentNote.folderid === folder.id) {
            return folder;
          }
        });
        console.log(currentFolder);
        return (
          <div className="content-container">
            <Link to="/">
              <button className="back-btn">Go Back</button>
            </Link>
            <div className="Folder-Sidebar">
              <div className="folder">
                <h2>{currentFolder.name}</h2>
              </div>
            </div>
            <div className="Note-section">
              <div className="note">
                <h2>{currentNote.name}</h2>
                <p>Date modified on: {currentNote.modified}</p>
                <Link to={`/editNote/${currentNote.id}`}>
                  <button
                    type="button"
                    // onClick={() => context.updateNote(props.match.params.noteId)}
                  >
                  Edit Note
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => deleteNoteRequest(props.match.params.noteId, context.deleteNote)}
                >
                  Delete Note
                </button>
                <p>{currentNote.content}</p>
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

// NotePage.propTypes = {
//   match: propTypes.shape({
//     isExact: propTypes.bool,
//     params: propTypes.shape({
//       noteId: propTypes.string,
//     }),
//     path: propTypes.string,
//     url: propTypes.string,
//   }),
// };
