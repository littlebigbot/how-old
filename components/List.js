import React, { Component, PropTypes } from 'react'
import { map, isEmpty, partial } from 'lodash';

export default class List extends Component {
  // renderLoadMore() {
  //   const { isFetching, onLoadMoreClick } = this.props
  //   console.log(this)
  //   return (
  //     <button style={{ fontSize: '150%' }}
  //             onClick={onLoadMoreClick}
  //             disabled={isFetching}>
  //       {isFetching ? 'Loading...' : 'Load More'}
  //     </button>
  //   )
  // }

  render() {
    console.log(this);
    const {
      isFetching,
      keys,
      values,
      renderItem,
      loadingLabel,
      totalPages,
      currentPage
    } = this.props

    const isListEmpty = isEmpty(keys);
    const isLastPage = currentPage === totalPages;

    if (isFetching && (keys && keys.length === 0)) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    if (isListEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }
    const renderToValues = partial(renderItem, values);
    return (
      <div>
        {map(keys, renderToValues)}
      </div>
    )
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  // pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  // onLoadMoreClick: PropTypes.func.isRequired,
}

List.defaultProps = {
  // isFetching: true,
  loadingLabel: 'Loading...'
}
