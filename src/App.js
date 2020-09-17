import React from "react";
import NoteList from "./Note";
import Store from "./Store";
import FolderList from "./FolderList";
// import { Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: Store,
    };
  }

  // handleFolderSelected = () => {};

  // handleFolderAdd = () => {};

  // handleFolderDelete = () => {};

  // handleNoteSelected = () => {};

  // hamdleNoteAdd = () => {};

  // handleNoteDelete = () => {};

  render() {
    const { store } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Noteful</h1>
        </header>
        <div className="Folder-Sidebar">
          <FolderList
            folders={store.folders}
            // handleFolderAdd={this.handleFolderAdd}
            // handleFolderDelete={this.handleFolderDelete}
            // handleFolderSelected = () => {};
          />
        </div>
        <div className="Note-section">
          <NoteList
            notes={store.notes}
            // handleNoteAdd={this.handleNoteAdd}
            // handleNoteDelete={this.handleNoteDelete}
            // handleNoteSelected = () => {};
          />
        </div>
      </main>
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
