import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Result extends Component {
  render() {
    const { title, name } = this.props.result

    return (
      <div className="Result">
          {title || name}
      </div>
    )
  }
}

Result.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    mediaType: PropTypes.string.isRequired
  }).isRequired
}
