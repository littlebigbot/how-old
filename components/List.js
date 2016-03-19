import React, { Component, PropTypes } from 'react'
import { map, isEmpty } from 'lodash';

export default class List extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props
    console.log(this)
    return (
      <button style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    )
  }

  render() {
    console.log(this);
    const {
      isFetching, items,
      renderItem, loadingLabel,
      totalPages,
      currentPage
    } = this.props

    const isListEmpty = isEmpty(items);
    const isLastPage = currentPage === totalPages;

    if (isFetching && (items && items.length === 0)) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    if (isListEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div>
        {map(items, renderItem)}
        {(currentPage > 0 && !isLastPage) && this.renderLoadMore()}
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
  onLoadMoreClick: PropTypes.func.isRequired,
  // nextPageUrl: PropTypes.string
}

List.defaultProps = {
  // isFetching: true,
  loadingLabel: 'Loading...'
}
