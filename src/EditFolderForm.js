import React from "react";
// import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Context from "./Context";
// import ValidationError from "./ValidationError";
import config from "./config"

class EditFolderForm extends React.Component {
  static contextType = Context;
  state = {
    // id: "",
    name: "",
    error: null,
    // name: {
    //     value: "",
    //     touched: false,
    // },
  }

  componentDidMount() {
    const { folderid } = this.props.match.params
    fetch(`http://localhost:8000/folders/${folderid}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(error => Promise.reject(error))
        
        return res.json()
      })
      .then(responseData => {
        this.setState({
          //id: responseData.id,
          name: responseData.name
          //name: { value: responseData.name },
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
      //name: { value: e.target.value }
    })
  }

  handleSubmit = (e) => {
    console.log(`handleSubmit ran!`)
    e.preventDefault();
    const { folderid } = this.props.match.params
    const { name } = this.state
    const newFolder = { name }

    //PATCH request here
    fetch(`http://localhost:8000/folders/${folderid}`, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(responseData => {
        // console.log(responseData)
        this.setState({
          //id: responseData.id,
          name: responseData.name,
          //name: { value: responseData.name }
        }, () => {
          this.context.updateFolder(newFolder)
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  resetFields = (newFields) => {
    this.setState({
      //id: newFields.id || "",
      name: newFields.name || "",
      //name: { value: newFields.name } || '',
    })
  }

  handleClickCancel = () => {
    this.props.history.push("/")
  };

  render() {
    const { error, name } = this.state
    return (
      <section className='EditFolder'>
        <h2>Edit Folder</h2>
        <form
          className='EditFolder__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditFolder__error' role='alert'>
          {error && <p>{error.message}</p>}
          </div>
          {/* <input
            type='hidden'
            name='id'
          /> */}
          <div>
            <label htmlFor='name'>
            Folder Name:
            {' '}
            </label>
            <input
            type='text'
            name='name'
            id='name'
            placeholder='Random folder!'
            required
            value={name}
            onChange={this.handleChangeName}
            />
          </div>
          <div className='EditFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit' onClick={this.props.history.push("/")}>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(EditFolderForm);