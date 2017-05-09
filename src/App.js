import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Comment from './Comment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      names: [],
      comments: [],
      times: [],
      inputComment: '',
      inputName: '',
    };

    fetch('/api/comments') // or whatever URL you want
      .then((response) => { const result = response.json(); console.log('response.json: ' + result); return result; })
      .catch((error) => console.log('1st error: ' + error))
      .then((comments) => {
        let newids = [];
        let newnames = [];
        let newcomments = [];
        let newtimes = [];
        for (var a = 0; a < comments.length; a++) {
          newids.push(comments[a].id);
          newnames.push(comments[a].name);
          newcomments.push(comments[a].comment);
          newtimes.push(comments[a].time);
        }
        this.setState({ ids: newids, names: newnames, comments: newcomments, times: newtimes });
      })
      .catch((error) => console.log('2nd error: ' + error));

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(event) {
    this.setState({ inputName: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ inputComment: event.target.value });
  }

  handleSubmit() {
    console.log(JSON.stringify({
        comment: this.state.inputComment,
        name: this.state.inputName,
      }));
    fetch('/api/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: this.state.inputComment,
        name: this.state.inputName,
      })
    }).then(function(res) {
        if (res.ok) {
          console.log('post ok')
        } 
      }, function(e) {
        alert("Error: " + e);
    });
  }

  handleClick(accessKey) {
    console.log("should add comment to " + accessKey);
  }

  
  render() {
    // returning outside fetch will not wait for fetch to complete
    let allcomments = [];
    for (var a = 0; a < this.state.ids.length; a++) {
      allcomments.push(<Comment key={this.state.ids[a].toString()} accessKey={this.state.ids[a].toString()} name={this.state.names[a]} comment={this.state.comments[a]} time={this.state.times[a]} handleClick={this.handleClick} />)
    }
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s3">
              <input className="validate" type="text" onChange={this.handleNameChange} id="input_name" placeholder="Name..." />
            </div>
            <div className="input-field col s6">
              <input type="text" onChange={this.handleCommentChange} id="input_comment" placeholder="Comment..." />
            </div>
            <div className="col s3">
              <button className="btn waves-effect waves-light" type="submit">
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
        <ul className="collection">
          {allcomments}
        </ul>
      </div>
    );
  }
}

export default App;