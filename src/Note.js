import React from "react";
import Context from "./Context";
import { Link } from "react-router-dom";

function deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res.json();
    })
    .then((data) => {
      callback(noteId);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function Note(props) {
  return (
    <Context.Consumer>
      {(context) => (
        <div className="note">
          <Link to={`/note/${props.id}`}>
            <h2>{props.header}</h2>
          </Link>
          <p>Date modified on: {props.modified}</p>
          <button
            type="button"
            onClick={() => {
              deleteNoteRequest(props.id, context.deleteNote);
            }}
          >
            Delete Note
          </button>
        </div>
      )}
    </Context.Consumer>
  );
}

// props.notes.map((note) => {
// const notes = props.notes.map((note, idx) => {
