import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Result extends Component {
  componentWillMount() {
    // const { loadExtraInfo } = this.props;
    // loadExtraInfo(mediaType, id);
  }

  render() {
    const { title, name, mediaType, id, firstAirDate, releaseDate } = this.props.result

    return (
      <div className="Result">
        <Link to={`/media/${mediaType}/${id}`}>
          {title || name}
          {` - `}
          {firstAirDate || releaseDate}
        </Link>
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
