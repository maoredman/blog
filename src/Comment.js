import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.state = { // stores information of replies
      ids: [],
      names: [],
      replies: [],
      times: [],
      inputReply: '',
      inputName: '',
      showReplies: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/comments/' + this.props.accessKey)
      .then((response) => { const result = response.json(); return result; })
      .catch((error) => console.log('1st error: ' + error))
      .then((comment) => {
        let newids = [];
        let newnames = [];
        let newreplies = [];
        let newtimes = [];
        for (var a = 0; a < comment.replies.length; a++) {
          newids.push(comment.replies[a].id);
          newnames.push(comment.replies[a].name);
          newreplies.push(comment.replies[a].reply);
          newtimes.push(comment.replies[a].time);
        }
        this.setState({ ids: newids, names: newnames, replies: newreplies, times: newtimes });
      })
      .catch((error) => console.log('2nd error: ' + error));
  }

  handleClick() {
    this.props.handleClick(this.props.accessKey);
    this.setState({ showReplies: !this.state.showReplies });
  }

  handleNameChange(event) {
    this.setState({ inputName: event.target.value });
  }

  handleReplyChange(event) {
    this.setState({ inputReply: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify({
        reply: this.state.inputReply,
        name: this.state.inputName,
      }));
    fetch('/api/comments/'  + this.props.accessKey , {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reply: this.state.inputReply,
        name: this.state.inputName,
      })
    })
    let newids = this.state.ids;
    newids.push(this.state.ids.length);
    let newnames = this.state.names;
    newnames.push(this.state.inputName);
    let newreplies = this.state.replies;
    newreplies.push(this.state.inputReply);
    let newtimes = this.state.times;
    newtimes.push(Date());
    this.setState({
      ids: newids,
      names: newnames,
      replies: newreplies,
      times: newtimes,
      inputReply: '',
      inputName: ''
    });
  }

  render() {
    let allreplies = [];
    if (this.state.showReplies) {
      for (var a = 0; a < this.state.ids.length; a++) {
        allreplies.push
        (<li className="collection-item avatar" key={this.state.ids[a].toString()} accessKey={this.state.ids[a].toString()}>
          <i className="material-icons my-big-icon" style={{ fontSize: '25px' }}>account_circle</i>
          <span className="title bold" style={{ fontSize: '13px' }}>{this.state.names[a]}</span>
          <span className="timestamp bold" style={{ fontSize: '13px' }}>{this.state.times[a]}</span>
          <div className="flow-text comment-body" style={{ fontSize: '1.2em' }}>{this.state.replies[a]}</div>
        </li>)
      }
    }
    return (
      <li className="collection-item avatar">
        <i className="material-icons my-big-icon">account_circle</i>
        <span className="title bold">{this.props.name}</span>
        <span className="timestamp bold">{this.props.time}</span>
        <div className="flow-text comment-body">{this.props.comment}</div>
        <span onClick={this.handleClick} className="secondary-content comment-button"><i className="material-icons">comment</i>{this.state.ids.length}</span>

        <ul className={(this.state.showReplies ? '' : 'hide') + ' collection'}>
          {allreplies}
          <form className="col s10" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s2">
                <input className="validate" type="text" onChange={this.handleNameChange} id="input_name" placeholder="Name..." value={this.state.inputName} required/>
              </div>
              <div className="input-field col s5">
                <input type="text" onChange={this.handleReplyChange} id="input_comment" placeholder="Reply..." value={this.state.inputReply} required/>
              </div>
              <div className="col s3">
                <button className="btn waves-effect waves-light reply-button" type="submit">
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </ul>

      </li>
    );
  }
}
Comment.propTypes = {
  name: React.PropTypes.string.isRequired,
  comment: React.PropTypes.string.isRequired,
};

export default Comment;