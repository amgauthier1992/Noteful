import React from "react";

//If message is a string, display the message, otherwise if it is
//undefined return an empty fragment.

export default function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}
