import React from "react";
// import Store from "./Store";
import { Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import FolderPage from "./FolderPage";
import NotePage from "./NotePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // store: Store,
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

  componentDidMount() {
    const endpoints = [
      "http://localhost:9090/folders",
      "http://localhost:9090/notes",
    ];
    Promise.all(
      endpoints.map((endpoint) => {
        fetch(endpoint)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            console.log(response.json());
            return response.json();
          })
          .then((data) => {
            const folders_data = data[0];
            const notes_data = data[1];
            this.setState({
              folders: folders_data,
              notes: notes_data,
            });
          })
          .catch((error) => this.setState({ error }));
      })
    );
  }

  render() {
    const { folders, notes } = this.state;
    console.log(folders);
    console.log(notes);
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <HomePage {...routeProps} folders={folders} notes={notes} />
          )}
        />
        <Route
          path="/folder/:folderId"
          render={(routeProps) => (
            <FolderPage {...routeProps} folders={folders} notes={notes} />
          )}
        />
        <Route
          path="/note/:noteId"
          render={(routeProps) => (
            <NotePage {...routeProps} folders={folders} notes={notes} />
          )}
        />
      </div>
    );
  }
}

export default App;
