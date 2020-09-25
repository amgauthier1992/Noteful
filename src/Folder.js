import React from "react";
import proptypes from "prop-types";
import { Link } from "react-router-dom";

export default function Folder(props) {
  return (
    <div className="folder">
      <h2>
        <Link to={`/folder/${props.id}`}>{props.header}</Link>
      </h2>
    </div>
  );
}

Folder.propTypes = {
  id: proptypes.string,
  header: proptypes.string,
};
