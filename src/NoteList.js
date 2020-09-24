import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import Note from "./Note";

class NoteList extends React.Component {
  static contextType = Context;
  render() {
    const { addNote } = this.context;
    return (
      <section className="Note-List">
        <div className="List-Notes">
          {this.props.notes.map((note, i) => (
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
        <Link to="/addNote">
          <button
            className="add-note-btn"
            type="button"
            onClick={() => addNote}
          >
            Add Note
          </button>
        </Link>
      </section>
    );
  }
}

export default NoteList;
