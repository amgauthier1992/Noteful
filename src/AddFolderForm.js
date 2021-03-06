import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import ValidationError from "./ValidationError";
import config from "./config"
// import propTypes from "prop-types";

class AddFolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      error: null,
    };
  }
  static contextType = Context;

  //So after you POST a folder to the server, you should get back an object of folder that has an id in it.

  //We need to format the data as JSON then stringify it before sending
  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    const folder = { name: name.value };
    const url = `${config.API_ENDPOINT}/folders`;
    const options = {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
      },
    };
    //POST request here
    console.log(JSON.stringify(folder));
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ name: { value: folder.name } });
        this.context.addFolder(data);
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

  validateFolderName() {
    console.log(this.state.name.value);
    const folderName = this.state.name.value;
    console.log(folderName);
    if (folderName.trim() == "") {
      return "Folder name is required";
    }
    if (!folderName.match(/^[A-Za-z]+$/)) {
      return "Folder name must only contain letters A-Z (not case sensitive)";
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
            name="folderName"
            id="folderName"
            onChange={(e) => this.updateFolderName(e.target.value)}
          />
          {this.state.name.touched && (
            <ValidationError message={this.validateFolderName()} />
          )}
          <button
            className="addFolder-btn"
            type="submit"
            disabled={this.validateFolderName()}
          >
            Add Folder
          </button>
        </form>
      </>
    );
  }
}

// AddFolderForm.propTypes = {
//   name: propTypes.shape({
//     value: propTypes.string,
//     touched: propTypes.bool,
//   }),
//   error: propTypes.bool,
// };

//dont validate variables created inside of a handler. validate things from
//state and props being passed down. propTypes generally go right above export

export default AddFolderForm;
