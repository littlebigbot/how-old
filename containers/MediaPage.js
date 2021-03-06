import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMediaIfNeeded, getCredits, getFullCredits } from '../actions'
import _ from 'lodash';

class MediaPage extends Component {
  constructor(props) {
    super(props)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    const {mediaType, id, loadMediaIfNeeded, getCredits, getFullCredits} = this.props;
    loadMediaIfNeeded(mediaType, id)
    getCredits(mediaType, id).then(() => {
      const media = this.props.entities[id];
      _.each(media.cast, getFullCredits);
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   const { loadMedia } = this.props;
  //   if (nextProps.id !== this.props.id) {
  //     loadMedia(nextProps.mediaType, nextProps.query);
  //   }
  // }
  renderTv(media) {

    return (
      <div>
        {media.name}

        <div>
          {media.firstAirDate || '???'} - {media.lastAirDate || '???'}
        </div>
      </div>
    )
  }

  renderMovie(media) {
    return (
      <div>
        {media.title}
        <ul>
          {_.isObject(media.credits) && _.map(media.credits.cast, (c) => <li>{c.name} - {c.character}</li>)}
        </ul>
        <ul>
          {_.isObject(media.credits) && _.map(media.credits.crew, (c) => <li>{c.name} - {c.job}</li>)}
        </ul>
      </div>
    )
  }

  renderPerson(media) {
    return (
      <div>
        {media.name}
      </div>
    )
  }

  render() {
    if(_.isEmpty(this.props.entities) || _.isUndefined(this.props.entities[this.props.id])) {
      return (<h1>Loading</h1>);
    }
    const media = this.props.entities[this.props.id];
    switch(this.props.mediaType) {
      case 'tv':
        return this.renderTv(media);
      case 'movie':
        return this.renderMovie(media);
      case 'person':
        return this.renderPerson(media);
      default:
        return '<h1>Oh No!</h1>';
    }
  }
}

MediaPage.propTypes = {
  // loadMedia: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  const { mediaType, id } = ownProps.params
  const { entities } = state

  return {
    mediaType,
    id,
    entities
  }
}

export default connect(mapStateToProps, {
  loadMediaIfNeeded,
  getCredits,
  getFullCredits
})(MediaPage)
