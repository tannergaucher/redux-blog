import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form' // reduxForm func very similar to react-redux connect helper. Allows compoennt to talk directly to redux store
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField = field => {
    const {
      meta: { touched, error }
    } = field

    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type="text" className="form-control" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    )
  }

  onSubmit = values => {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" label="Title" component={this.renderField} />
        <Field name="categories" label="Categories" component={this.renderField} />
        <Field name="content" label="Post Content" component={this.renderField} />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <Link className="btn btn-danger cancel" to="/">
          Cancel
        </Link>
      </form>
    )
  }
}

//automatically called on submit
function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a title!'
  }

  if (!values.categories) {
    errors.categories = 'Enter a category!'
  }

  if (!values.content) {
    errors.content = 'No Contento!'
  }

  //validate inputs from 'values'
  //if errors returns empty object, redux form assumes form is fine to submit
  //else if form has any properties, assumed to be invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
)
