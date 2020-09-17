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
        <button type="button" onClick={() => props.handleNoteDelete}>
          Delete Note
        </button>
      </div>
      <button type="button" onClick={() => props.handleAddNote}>
        Add Note
      </button>
    </section>
  );
}
