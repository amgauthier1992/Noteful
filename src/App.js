import React from "react";
import Store from "./Store";
// import NoteList from "./NoteList";
// import FolderList from "./FolderList";
import { Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import FolderPage from "./FolderPage";
import NotePage from "./NotePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: Store,
      // folders: [],
      // notes: [],
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

  render() {
    // const { folders, notes } = this.state;
    const { store } = this.state;
    console.log(store.notes);
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
            <HomePage
              {...routeProps}
              folders={this.state.store.folders}
              notes={this.state.store.notes}
            />
          )}
        />
        <Route
          path="/folder/:folderId"
          render={(routeProps) => (
            <FolderPage
              {...routeProps}
              folders={this.state.store.folders}
              notes={this.state.store.notes}
            />
          )}
        />
        <Route
          path="/note/:noteId"
          render={(routeProps) => (
            <NotePage
              {...routeProps}
              folders={this.state.store.folders}
              notes={this.state.store.notes}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

//<Sidebar>

/* <Route path="/" component={MainSidebar} />
<Route path="/foo" component={FooSidebar} />
</Sidebar>
<Main>
<Route path="/" component={MainMain} />
<Route path="/foo" component={FooMain} />
</Main> */

//
