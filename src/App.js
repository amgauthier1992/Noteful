import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Context from "./Context";
import "./App.css";
import HomePage from "./HomePage";
import FolderPage from "./FolderPage";
import NotePage from "./NotePage";
import AddFolderForm from "./AddFolderForm";
import AddNoteForm from "./AddNoteForm";
import EditFolderForm from "./EditFolderForm"
import EditNoteForm from "./EditNoteForm"
import ErrorBoundary from "./ErrorBoundary";
import config from "./config"

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setFolders = (folders) => {
    this.setState({
      folders,
      error: null,
    });
  };

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    });
  };

  addFolder = (folder) => {
    const newFolders = [...this.state.folders];
    newFolders.push(folder);
    this.setState({
      folders: newFolders,
    });
    this.props.history.push("/");
  };

  addNote = (note) => {
    const newNotes = [...this.state.notes];
    newNotes.push(note);
    this.setState({
      notes: newNotes,
    });
    this.props.history.push("/");
  };

  deleteFolder = (folderid) => {
    const newFolders = this.state.folders.filter((folder) => folder.id !== folderid);
    this.props.history.push("/")
    this.setState({
      folders: newFolders
    })
  }

  deleteNote = (noteId) => {
    console.log(noteId);
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.props.history.push("/");
    this.setState({
      notes: newNotes,
    });
  };

  updateFolder = (updatedFolder) => {
    this.setState({
      folders: this.state.folders.map(folder => folder.id !== updatedFolder.id ? folder : updatedFolder)
    })
  }

  updateNote = (updatedNote) => {
    this.setState({
      notes: this.state.notes.map(note => note.id !== updatedNote.id ? note : updatedNote)
    })
  }

  componentDidMount() {
    //Get folders from API
    fetch("http://localhost:8000/folders", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
      },
    })
      .then((resFolders) => {
        if (!resFolders.ok) {
          throw new Error(resFolders.status);
        }
        return resFolders.json();
      })
      .then(this.setFolders)
      .catch((error) => this.setState({ error }));

    //Get notes from API
    fetch("http://localhost:8000/notes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
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
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteFolder: this.deleteFolder,
      deleteNote: this.deleteNote,
      updateFolder: this.updateFolder,
      updateNote: this. updateNote
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
            //purpose of render is sending down props aside from route props
            //if you are sending down props, you also need to send down
            //route props or else it wont work. In this context,
            //the component attribute sets the route props.

            // render={(routeProps) => (
            //   <HomePage {...routeProps} folders={folders} notes={notes} />
            // )}
          />
          <ErrorBoundary>
            <Route
              path="/folders/:folderid"
              component={FolderPage} //when the path is met folderpage is rendered
              // render={(routeProps) => (
              //   <FolderPage {...routeProps} folders={folders} notes={notes} />
              // )}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <Route
              path="/notes/:noteId"
              component={NotePage}
              // render={(routeProps) => (
              //   <NotePage {...routeProps} folders={folders} notes={notes} />
              // )}
            />
          </ErrorBoundary>
          <Route path="/addFolder" component={AddFolderForm} />
          <Route path="/addNote" component={AddNoteForm} />
          <Route path="/editFolder/:folderid" component={EditFolderForm} />
          <Route path="/editNote/:noteid" component={EditNoteForm} />
        </Context.Provider>
      </div>
    );
  }
}

export default withRouter(App);

//wrapping App in withRouter makes route props accessible in App.
