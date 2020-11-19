import React from "react";
// import proptypes from "prop-types";
import { Link } from "react-router-dom";
import config from "./config";
import Context from "./Context";

function deleteFolderRequest(folderid,cb) {
  fetch(`${config.API_ENDPOINT}/folders/${folderid}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${config.API_KEY}`
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error; //if you just do throw error, you wont see exactly what went wrong.
          //we want to return the message set up by the server router
        })
      }
      return res
    })
    .then(() => {
      cb(folderid)
    })
    .catch((error) => { //line 18 triggers the error if there is one, then this logs it
      console.error(error);
    })
}

export default function Folder(props) {
  return (
    <Context.Consumer>
      {(context) => (  
        <div className="folder">
          <h2>
            <Link to={`/folders/${props.id}`}>{props.header}</Link> 
          </h2>
          <button 
            className="edit-folder-btn">
            <Link to={`/editFolder/${props.id}`}>Edit</Link> 
          </button>
          <button 
            className="delete-folder-btn" 
            onClick={() => {
              deleteFolderRequest(props.id, context.deleteFolder)
            }}>
            Delete
          </button>
        </div>
      )}
    </Context.Consumer>
  );
}

// Folder.propTypes = {
//   id: proptypes.string,
//   header: proptypes.string,
// };

//so when we click on the link above for a folder, that changes the url