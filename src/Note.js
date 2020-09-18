import React from "react";
import { Link } from "react-router-dom";

export default function Note(props) {
  return (
    <div className="note">
      <Link to={`/note/${props.id}`}>
        <h2>{props.header}</h2>
      </Link>
      <p>Date modified on: {props.modified}</p>
      <button type="button" onClick={() => props.handleNoteDelete(props.id)}>
        Delete Note
      </button>
    </div>
  );
}

// props.notes.map((note) => {
// const notes = props.notes.map((note, idx) => {
