import React from "react";
import Folder from "./Folder";

export default function FolderList(props) {
  return (
    <section className="Folder-List">
      <div className="List-Folders">
        {props.folders.map((folder, i) => (
          <Folder key={i} id={folder.id} header={folder.name} />
        ))}
      </div>
      <button type="button" onClick={() => props.handleAddFolder}>
        Add Folder
      </button>
    </section>
  );
}

//refactor to call folder.
/* <header className="Folder-header">{props.header}</header> */
