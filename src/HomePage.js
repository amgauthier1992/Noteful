import React from "react";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Context from "./Context";

export default function HomePage() {
  return (
    <Context.Consumer>
      {(context) => {
        return (
          <main className="App">
            <div className="content-container">
              <div className="Folder-Sidebar">
                <FolderList
                  // folders={this.state}
                  folders={context.folders}
                  // handleFolderAdd={this.handleFolderAdd}
                  // handleFolderDelete={this.handleFolderDelete}
                  // handleFolderSelected={this.handleFolderSelected}
                />
              </div>
              <div className="Note-section">
                <NoteList
                  // notes={this.state}
                  notes={context.notes}
                  // handleNoteAdd={this.handleNoteAdd}
                  // handleNoteDelete={this.handleNoteDelete}
                  // handleNoteSelected={this.handleFolderSelected}
                />
              </div>
            </div>
          </main>
        );
      }}
    </Context.Consumer>
  );
}

//functional component use consumer
