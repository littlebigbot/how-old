import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMedia } from '../actions'

class MediaPage extends Component {
  constructor(props) {
    super(props)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    const {mediaType, id, loadMedia} = this.props;
    loadMedia(mediaType, id)
  }

  // componentWillReceiveProps(nextProps) {
  //   const { loadMedia } = this.props;
  //   if (nextProps.id !== this.props.id) {
  //     loadMedia(nextProps.mediaType, nextProps.query);
  //   }
  // }

  render() {
    const { media } = this.props

    return (
      <div>
      Hi?
        {media.name}
      </div>
    )
  }
}

MediaPage.propTypes = {
  // loadMedia: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  const { mediaType, id } = ownProps.params
  const { media } = state.entities

  return {
    mediaType,
    id,
    media
  }
}

export default connect(mapStateToProps, {
  loadMedia
})(MediaPage)
