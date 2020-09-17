import React from "react";

export default function Note(props) {
  return (
    <div className="note">
      <h2>{props.header}</h2>
      <p>{props.modified}</p>
    </div>
  );
}

// props.notes.map((note) => {
// const notes = props.notes.map((note, idx) => {
