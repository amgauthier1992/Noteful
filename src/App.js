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
  render() {
    const { store } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Noteful</h1>
        </header>
        <div className="Folder-Sidebar">
          <div className="Folder-List">
            {store.folders.map((folder) => (
              <FolderList key={folder.id} header={folder.name} />
            ))}
          </div>
        </div>
        <div className="Note-section">
          <div className="Note-List">
            {store.notes.map((note) => (
              <NoteList
                key={note.id}
                header={note.name}
                modified={note.modified}
                folderId={note.folderId}
                content={note.content}
              />
            ))}
          </div>
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
