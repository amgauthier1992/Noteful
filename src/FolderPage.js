import React from "react";
// import propTypes from "prop-types";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Context from "./Context";

class FolderPage extends React.Component {
  static contextType = Context;
  render() {
    const { folders, notes } = this.context;

    //returns an object if the folder id matches the current route prop value
    //inside the params object. If there are no matches, it will return
    //undefined. We then validate if the folder object we create exists.
    //whenever we grab from params obj it will be a string
    const folder = folders.find((folder) => {
      console.log(folder);
      if (folder.id === Number(this.props.match.params.folderid)){
        return folder;
      }
    });
    if (folder === undefined) {
      // console.log(folder.id)
      // console.log(folders) //3
      // console.log(this.props.match.params.folderid)
      throw new Error("This folder doesn't exist");
    }
    // console.log(this.props.match.params.folderid);
    const folderNotes = notes.filter((note) => {
      if (note.folderid === Number(this.props.match.params.folderid)) {
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

// FolderPage.propTypes = {
//   match: propTypes.shape({
//     isExact: propTypes.bool,
//     params: propTypes.shape({
//       folderId: propTypes.string,
//     }),
//     path: propTypes.string,
//     url: propTypes.string,
//   }),
// };

export default FolderPage;
