import React from "react";
import Context from "./Context";
import Folder from "./Folder";

class FolderList extends React.Component {
  static contextType = Context;
  render() {
    const { folders, addFolder } = this.context;
    return (
      <section className="Folder-List">
        <div className="List-Folders">
          {folders.map((folder, i) => (
            <Folder key={i} id={folder.id} header={folder.name} />
          ))}
        </div>
        <button type="button" onClick={() => addFolder}>
          Add Folder
        </button>
      </section>
    );
  }
}
export default FolderList;

//refactor to call folder.
/* <header className="Folder-header">{props.header}</header> */
