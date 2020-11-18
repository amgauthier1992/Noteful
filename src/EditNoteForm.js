// import React from 'react';
// // import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom'
// import BookmarksContext from '../BookmarksContext';
// import config from '../config'
// import './EditBookmark.css';

// const Required = () => (
//   <span className='EditBookmark__required'>*</span>
// )

// class EditBookmark extends React.Component {
//   static contextType = BookmarksContext;

//   state = {
//     error: null,
//     id: '',
//     title: '',
//     url: '',
//     description: '',
//     rating: 1,
//   }

//   //we want to get our bookmark first. so that we can capture
//   //the current fields that we want to update. In order to get our bookmark, 
//   //we need to create a GET request to the getById endpoint.
//   componentDidMount() {
//     const { bookmarkId } = this.props.match.params
//     fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
//       method: 'GET',
//       headers: {
//         'authorization': `Bearer ${config.API_KEY}`
//       }
//     })
//       //called after the success or failure of the above operation. The above operation's job
//       //is to grab an the bookmark with the corresponding bookmarkId. If the response we get from the server,
//       //is a good response (201 etc.), we return our response and parse it into json. Otherwise, if the response is not ok,
//       //we return an error which will trigger our catch below and update the error property from null in our state.
//       .then(res => {
//         if (!res.ok)
//           return res.json().then(error => Promise.reject(error))

//         return res.json()
//       })
//       //once our response is converted to json, we then take that responseData and use it to update the state
//       //with the information retrieved from the API for that specific bookmark. This is how we are able to pre-populate
//       //our fields for our PATCH request below. 
//       .then(responseData => {
//         this.setState({
//           id: responseData.id,
//           title: responseData.title,
//           url: responseData.url,
//           description: responseData.description,
//           rating: parseInt(responseData.rating),
//         })
//       })
//       .catch(error => {
//         console.error(error)
//         this.setState({ error })
//       })
//   }

//   handleChangeTitle = (e) => {
//     this.setState({
//       title: e.target.value
//     })
//   }

//   handleChangeUrl = (e) => {
//     this.setState({
//       url: e.target.value
//     })
//   }

//   handleChangeDescription = (e) => {
//     this.setState({
//       description: e.target.value
//     })
//   }

//   handleChangeRating = (e) => {
//     this.setState({
//       rating: parseInt(e.target.value)
//     })
//   }

//   handleSubmit = (e) => {
//     console.log(`handleSubmit ran!`)
//     e.preventDefault();
//     //if you dont use curlys this.props.match.params is an object,
//     //which throws an error.
//     const { bookmarkId } = this.props.match.params
//     const { id, title, url, description, rating } = this.state
//     const newBookmark = { id, title, url, description, rating }
    
//     //PATCH request here
//     fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
//       method: 'PATCH',
//       body: JSON.stringify(newBookmark),
//       headers: {
//         'content-type': 'application/json',
//         'authorization': `Bearer ${config.API_KEY}`
//       },
//     })
//       .then(res => {
//         if (!res.ok){
//           return res.json().then(error => Promise.reject(error))
//         }
//         return res.json()
//       })
//       .then(responseData => {
//         // console.log(responseData)
//         this.setState({
//           id: responseData.id,
//           title: responseData.title,
//           url: responseData.url,
//           description: responseData.description,
//           rating: parseInt(responseData.rating),
//         }, () => {
//           this.context.updateBookmark(newBookmark)
//         })
//       })
//       .catch(error => {
//         console.error(error)
//         this.setState({ error }) //error: error
//       })
//   }

//   resetFields = (newFields) => {
//     this.setState({
//       id: newFields.id || '',
//       title: newFields.title || '',
//       url: newFields.url || '',
//       description: newFields.description || '',
//       rating: newFields.rating || 1,
//     })
//   }

//   handleClickCancel = () => {
//     this.props.history.push('/')
//   };

//   render() {
//     const { error, title, url, description, rating } = this.state
//     return (
//       <section className='EditBookmark'>
//         <h2>Edit bookmark</h2>
//         <form
//           className='EditBookmark__form'
//           onSubmit={this.handleSubmit}
//         >
//           <div className='EditBookmark__error' role='alert'>
//             {error && <p>{error.message}</p>}
//           </div>
//           <input
//             type='hidden'
//             name='id'
//           />
//           <div>
//             <label htmlFor='title'>
//               Title
//               {' '}
//               <Required />
//             </label>
//             <input
//               type='text'
//               name='title'
//               id='title'
//               placeholder='Great website!'
//               required
//               value={title}
//               onChange={this.handleChangeTitle}
//             />
//           </div>
//           <div>
//             <label htmlFor='url'>
//               URL
//               {' '}
//               <Required />
//             </label>
//             <input
//               type='url'
//               name='url'
//               id='url'
//               placeholder='https://www.great-website.com/'
//               required
//               value={url}
//               onChange={this.handleChangeUrl}
//             />
//           </div>
//           <div>
//             <label htmlFor='description'>
//               Description
//             </label>
//             <textarea
//               name='description'
//               id='description'
//               value={description}
//               onChange={this.handleChangeDescription}
//             />
//           </div>
//           <div>
//             <label htmlFor='rating'>
//               Rating
//               {' '}
//               <Required />
//             </label>
//             <input
//               type='number'
//               name='rating'
//               id='rating'
//               min='1'
//               max='5'
//               required
//               value={rating}
//               onChange={this.handleChangeRating}
//             />
//           </div>
//           <div className='EditBookmark__buttons'>
//             <button type='button' onClick={this.handleClickCancel}>
//               Cancel
//             </button>
//             {' '}
//             <button type='submit'>
//               Save
//             </button>
//           </div>
//         </form>
//       </section>
//     )
//   }
// }


// export default withRouter(EditBookmark);