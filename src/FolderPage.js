import React from "react";
import FolderList from "./FolderList";
import NoteList from "./NoteList";

export default function FolderPage(props) {
  console.log(props.match.params.folderId);
  const folderNotes = props.notes.filter((note) => {
    if (note.folderId === props.match.params.folderId) {
      return note;
    }
  });
  return (
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
          notes={folderNotes}
          // handleNoteAdd={this.handleNoteAdd}
          // handleNoteDelete={this.handleNoteDelete}
          // handleNoteSelected={this.handleFolderSelected}
        />
      </div>
    </div>
  );
}
