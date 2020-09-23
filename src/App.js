import React from "react";
// import Store from "./Store";
import { Route, Link, withRouter } from "react-router-dom";
import Context from "./Context";
import "./App.css";
import HomePage from "./HomePage";
import FolderPage from "./FolderPage";
import NotePage from "./NotePage";
import AddFolderForm from "./AddFolderForm";
import AddNoteForm from "./AddNoteForm";
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

  addFolder = (folder) => {
    const newFolders = this.state.folders.push(folder);
    this.props.history.push("/");
    this.setState({
      folders: newFolders,
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  deleteNote = (noteId) => {
    console.log(noteId);
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.props.history.push("/");
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
      addFolder: this.addFolder,
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
            //purpose of render is sending down props aside from route props
            //if you are sending down props, you also need to send down
            //route props or else it wont work. In this context,
            //the component attribute sets the route props.

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
          <Route path="/addFolder" component={AddFolderForm} />
          <Route path="/addNote" component={AddNoteForm} />
        </Context.Provider>
      </div>
    );
  }
}

export default withRouter(App);

//wrapping App in withRouter makes route props accessible in App.
