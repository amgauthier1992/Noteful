import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import Context from "./Context";
// import ValidationError from "./ValidationError";
import config from "./config"

class EditFolderForm extends React.Component {
  static contextType = Context;
  state = {
    // id: "", id doesnt need to be in state. We will never edit it
    name: "",
    error: null,
    // name: {
    //     value: "",
    //     touched: false,
    // },
  }

  componentDidMount() {
    const { folderid } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/folders/${folderid}`, {
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
    fetch(`${config.API_ENDPOINT}/folders/${folderid}`, {
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
          //this.context.updateFolder(newFolder) here we arent passing an id
          //property to the updateFolder method which relies on the id to
          //perform the update. By using responseData as the argument, it
          //contains the id by default since we get the id from our fetch.
          //if you have access to the ID from the fetch request response, then why not just use that?
          this.context.updateFolder(responseData)
          this.props.history.push("/")
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
          onSubmit={(e) => this.handleSubmit(e)}
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
            onChange={(e) => this.handleChangeName(e)}
            />
          </div>
          <div className='EditFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(EditFolderForm);