import React from "react";
import Note from "./Note";

export default function NoteList(props) {
  return (
    <section className="Note-List">
      <div className="List-Notes">
        {props.notes.map((note, i) => (
          <Note
            key={i}
            id={note.id}
            header={note.name}
            modified={note.modified}
            folderId={note.folderId}
            content={note.content}
          />
        ))}
      </div>
      <button
        className="add-note-btn"
        type="button"
        onClick={() => props.handleAddNote}
      >
        Add Note
      </button>
    </section>
  );
}
