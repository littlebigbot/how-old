import React, { Component, PropTypes } from 'react'
import { map, isEmpty } from 'lodash';

export default class List extends Component {
  // renderLoadMore() {
  //   const { isFetching, onLoadMoreClick } = this.props
  //   return (
  //     <button style={{ fontSize: '150%' }}
  //             onClick={onLoadMoreClick}
  //             disabled={isFetching}>
  //       {isFetching ? 'Loading...' : 'Load More'}
  //     </button>
  //   )
  // }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel,
      totalResults
    } = this.props

    const isListEmpty = isEmpty(items);
    if (isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isListEmpty && (isLastPage || totalResults)) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div>
        {map(items, renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  // pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  // items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  // onLoadMoreClick: PropTypes.func.isRequired,
  // nextPageUrl: PropTypes.string
}

List.defaultProps = {
  // isFetching: true,
  loadingLabel: 'Loading...'
}
