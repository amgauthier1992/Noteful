import React from "react";
// import Store from "./Store";
import { Route, Link } from "react-router-dom";
import Context from "./Context";
import "./App.css";
import HomePage from "./HomePage";
import FolderPage from "./FolderPage";
import NotePage from "./NotePage";
// import Folder from "./Folder";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null,
    };
  }

  // handleFolderSelected = (e) => {};

  // handleFolderAdd = () => {};

  // handleFolderDelete = (folderId) => {};

  // handleNoteSelected = (e) => {};

  // handleNoteAdd = () => {};

  // handleNoteDelete = (noteId) => {
  //   const { notes } = this.state.notes;
  //   let newNotes = notes.filter((noteId) => {
  //     noteId !== notes.id;
  //   });
  //   this.setState({ notes: newNotes });
  // };

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({
      notes: newNotes,
    });
  };

  componentDidMount() {
    //Get folders from API
    fetch("http://localhost:9090/folders", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resFolders) => {
        if (!resFolders.ok) {
          throw new Error(resFolders.status);
        }
        return resFolders.json();
      })
      .then((folders) => {
        this.setState({ folders });
      })
      .catch((error) => this.setState({ error }));

    //Get notes from API
    fetch("http://localhost:9090/notes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resNotes) => {
        if (!resNotes.ok) {
          throw new Error(resNotes.status);
        }
        return resNotes.json();
      })
      .then(this.setNotes)
      .catch((error) => this.setState({ error }));
  }

  render() {
    // const { folders, notes } = this.state;
    // console.log(folders);
    // console.log(notes);
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <Context.Provider value={contextValue}>
          <Route
            exact
            path="/"
            component={HomePage}
            // render={(routeProps) => (
            //   <HomePage {...routeProps} folders={folders} notes={notes} />
            // )}
          />
          <Route
            path="/folder/:folderId"
            component={FolderPage}
            // render={(routeProps) => (
            //   <FolderPage {...routeProps} folders={folders} notes={notes} />
            // )}
          />
          <Route
            path="/note/:noteId"
            component={NotePage}
            // render={(routeProps) => (
            //   <NotePage {...routeProps} folders={folders} notes={notes} />
            // )}
          />
        </Context.Provider>
      </div>
    );
  }
}

export default App;
