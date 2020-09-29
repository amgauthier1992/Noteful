import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import ValidationError from "./ValidationError";
// import propTypes from "prop-types";

class AddNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      content: {
        value: "",
        touched: false,
      },
      folder: {
        value: "",
        touched: false,
      },
      error: null,
    };
  }
  static contextType = Context;

  handleSubmit(event) {
    event.preventDefault();
    // const { name, content, folder } = this.state;
    // const note = {
    //   name: name.value,
    //   content: content.value,
    //   folderId: folder.value,
    //   modified: new Date(),
    // };
    const note = {
      name: event.target["note-name-select"].value,
      content: event.target["note-content-select"].value,
      folderId: event.target["note-folder-select"].value,
      modified: new Date(),
    };
    const url = "http://localhost:9090/notes";
    const options = {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    };
    //POST request here
    console.log(JSON.stringify(note));
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          name: { value: note.name },
          content: { value: note.content },
          folder: { value: note.folder },
          modified: { value: note.modified },
        });
        this.context.addNote(data);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  updateNoteName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateNoteContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  updateNoteFolder(folderId) {
    this.setState({ folder: { value: folderId, touched: true } });
  }

  validateNoteName() {
    console.log(this.state.name.value);
    const noteName = this.state.name.value;
    console.log(noteName);
    if (noteName.trim() == "") {
      return "Note name is required";
    }
    if (!noteName.match(/^[A-Za-z]+$/)) {
      return "Note name must only contain letters A-Z (not case sensitive)";
    }
  }

  validateNoteContent() {
    const noteContent = this.state.content.value;
    if (noteContent.trim() == "") {
      return "You must specify content inside of the new note";
    }
  }

  validateFolderSelect() {
    const folderId = this.state.folder.value;
    console.log(folderId);
    if (folderId.trim() === "" || folderId.trim() === "...") {
      return "You must specify a corresponding folder to store this new note";
    }
  }

  render() {
    const { folders = [] } = this.context;
    return (
      <>
        <Link to="/">
          <button className="back-btn">Go Back</button>
        </Link>
        <form id="note-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="note-name-select">Note Name:</label>
          <input
            type="text"
            name="note-name-select"
            id="note-name-select"
            onChange={(e) => this.updateNoteName(e.target.value)}
          />
          {this.state.name.touched && (
            <ValidationError message={this.validateNoteName()} />
          )}
          <label htmlFor="note-content-select">Content:</label>
          <textarea
            name="note-content-select"
            id="note-content-select"
            rows="6"
            cols="50"
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
          {this.state.content.touched && (
            <ValidationError message={this.validateNoteContent()} />
          )}
          <label htmlFor="note-folder-select">Folder</label>
          <select
            id="note-folder-select"
            name="note-folder-select"
            onChange={(e) => this.updateNoteFolder(e.target.value)}
          >
            <option value={null}>...</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          {this.state.folder.touched && (
            <ValidationError message={this.validateFolderSelect()} />
          )}
          <button
            className="addNote-btn"
            type="submit"
            disabled={(this.validateNoteName(), this.validateNoteContent())}
          >
            Add Note
          </button>
        </form>
      </>
    );
  }
}

// AddNoteForm.propTypes = {
//   name: propTypes.shape({
//     value: propTypes.string,
//     touched: propTypes.bool,
//   }),
//   content: propTypes.shape({
//     value: propTypes.string,
//     touched: propTypes.bool,
//   }),
//   folder: propTypes.shape({
//     value: propTypes.string,
//     touched: propTypes.bool,
//   }),
//   error: propTypes.bool,
// };

export default AddNoteForm;
