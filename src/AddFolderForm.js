import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import ValidationError from "./ValidationError";

class AddFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
    };
  }
  static contextType = Context;

  //We need to format the data as JSON then stringify it before sending
  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    const folder = { name: name.value };
    const url = "http://localhost:9090/folders";
    const options = {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "Content-Type": "application/json",
      },
    };
    //POST request here
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ name: { value: folder } });
        this.context.addFolder(folder);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  updateFolderName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  //this.state.name.value logs as an object. We need it to be a string
  validateFolderName() {
    console.log(this.state.name.value);
    const folderName = JSON.stringify(this.state.name.value);
    console.log(folderName);
    if (folderName.length === 0) {
      return "Folder name is required";
    }
    if (folderName.match(/[0-9]/)) {
      return "Folder name must only contain letters";
    }
  }

  render() {
    return (
      <>
        <Link to="/">
          <button className="back-btn">Go Back</button>
        </Link>
        <form id="folder-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="folderName">Folder Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => this.updateFolderName(e.target.value)}
          />
          {this.state.name.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
          <button
            className="addFolder-btn"
            type="submit"
            disabled={this.validateFolderName()}
            // onClick={(e) => addFolderRequest(this.context.addFolder)}
          >
            Add Folder
          </button>
        </form>
      </>
    );
  }
}

export default AddFolderForm;
