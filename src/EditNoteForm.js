import React from "react"
import Context from "./Context"
import { withRouter } from 'react-router-dom'
import config from "./config"

class EditNoteForm extends React.Component {
  static contextType = Context
  state = {
    error: null,
    name: "",
    content: "",
    folderid: "",
  }

  componentDidMount(){
    const { noteid } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/notes/${noteid}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(error => Promise.reject(error))
        
        return res.json()
      })
      .then(responseData => {
        this.setState({
          name: responseData.name,
          content: responseData.content,
          folderid: responseData.folderid
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
    })
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleChangeFolderid = (e) => {
    this.setState({
      folderid: e.target.value
    })
  }

  handleSubmit = (e) => {
    console.log(`handleSubmit ran!`)
    e.preventDefault();
    const { noteid } = this.props.match.params
    const { name, content, folderid } = this.state
    const newNote = { name, content, folderid }

    //PATCH request here
    fetch(`${config.API_ENDPOINT}/notes/${noteid}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type" : "application/json",
        "Authorization" : `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(error => Promise.reject(error))
        
        return res.json()
      })
      .then(responseData => {
        this.setState({
          name: responseData.name,
          content: responseData.content,
          folderid: responseData.folderid
        }, () => {
          this.context.updateNote(responseData)
          this.props.history.push("/")
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push("/")
  }

  render(){
    const { folders } = this.context
    // const { folders = [] } = this.context;
    const { error, name, content, folderid } = this.state
    console.log(folders)
    console.log(this.state)
    return (
      <section className='EditNote'>
        <h2>Edit Note</h2>
        <form 
          className="EditNote__form" 
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className='EditNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='name'>
              Note Name:
              {' '}
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Random Note Name!'
              required
              value={name}
              onChange={(e) => this.handleChangeName(e)}
            />
          </div>
          <textarea
            type="text"
            name="content"
            id="content"
            rows="6"
            cols="50"
            required
            value={content}
            onChange={(e) => this.handleChangeContent(e)}
          />
          <select
            id="folders"
            name="folders"
            value={folderid}
            onChange={(e) => this.handleChangeFolderid(e)} //e not e.target.value
            // onChange={(e) => console.log(e.target.value)}
          >
            <option value={null}>...</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <div className='EditNote__buttons'>
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

export default withRouter(EditNoteForm);