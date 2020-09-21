import React from "react";
import Context from "./Context";
import Note from "./Note";

class NoteList extends React.Component {
  static contextType = Context;
  render() {
    const { notes, addNote } = this.context;
    return (
      <section className="Note-List">
        <div className="List-Notes">
          {notes.map((note, i) => (
            <Note
              key={i}
              id={note.id}
              header={note.name}
              modified={note.modified}
              folderId={note.folderId}
              content={note.content}
              // deleteNote={deleteNote}
            />
          ))}
        </div>
        <button className="add-note-btn" type="button" onClick={() => addNote}>
          Add Note
        </button>
      </section>
    );
  }
}

export default NoteList;
