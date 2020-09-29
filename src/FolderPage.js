import React from "react";
import propTypes from "prop-types";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Context from "./Context";

class FolderPage extends React.Component {
  static contextType = Context;
  render() {
    const { folders, notes } = this.context;
    // console.log(props.match.params.folderId);
    const folderNotes = notes.filter((note) => {
      if (note.folderId === this.props.match.params.folderId) {
        return note;
      }
    });
    console.log(folderNotes);
    return (
      <div className="content-container">
        <div className="Folder-Sidebar">
          <FolderList
            // folders={this.state}
            folders={folders}
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
}

FolderPage.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      folderId: propTypes.string,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }),
};

export default FolderPage;
