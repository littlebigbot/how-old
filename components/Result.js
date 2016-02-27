import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Result extends Component {
  render() {
    const { name } = this.props.result

    return (
      <div className="Result">
          {name}
      </div>
    )
  }
}

Result.propTypes = {
  // result: PropTypes.shape({
  //   // avatarUrl: PropTypes.string.isRequired,
  //   // name: PropTypes.string.isRequired
  // }).isRequired
}
