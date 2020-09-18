import React from "react";
import FolderList from "./FolderList";
import NoteList from "./NoteList";

export default function HomePage(props) {
  return (
    <main className="App">
      <div className="content-container">
        <div className="Folder-Sidebar">
          <FolderList
            // folders={this.state}
            folders={props.folders}
            // handleFolderAdd={this.handleFolderAdd}
            // handleFolderDelete={this.handleFolderDelete}
            // handleFolderSelected={this.handleFolderSelected}
          />
        </div>
        <div className="Note-section">
          <NoteList
            // notes={this.state}
            notes={props.notes}
            // handleNoteAdd={this.handleNoteAdd}
            // handleNoteDelete={this.handleNoteDelete}
            // handleNoteSelected={this.handleFolderSelected}
          />
        </div>
      </div>
    </main>
  );
}
