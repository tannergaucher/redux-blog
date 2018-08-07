import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'


class PostsShow extends Component {
  componentDidMount() {
    //get id from url using match prop from react-router
    const { id } = this.props.match.params
    console.log('id', id)
    this.props.fetchPost(id)
  }

  //create action creator for delete ajax request
  onDeleteClick = () => {
    const {id} = this.props.post
    this.props.deletePost(id, () => this.props.history.push('/'))
  }

  render() {
    const { post } = this.props
    console.log(post)

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button 
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

//want component to only receive the 1 post it cares about
// @mapStateToProps: 1st argument is Application state. 2nd arg ownProps.
function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow)
