import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.accessKey);
  }

  render() {
    /* var rows = [];
    this.props.products.forEach( (product) => {
      rows.push(<TodoItem value={product} key={product.name} />);
    }); */
    return (
      <li className="collection-item avatar">
        <i className="material-icons circle">account_circle</i>
        <span className="title bold">{this.props.name}</span>
        <span className="timestamp bold">{this.props.time}</span>
        <div className="flow-text comment-body">{this.props.comment}</div>
        <span onClick={this.handleClick} className="secondary-content comment-button"><i className="material-icons">comment</i></span>
      </li>
    );
  }
}
Comment.propTypes = {
  name: React.PropTypes.string.isRequired,
  comment: React.PropTypes.string.isRequired,
};

export default Comment;