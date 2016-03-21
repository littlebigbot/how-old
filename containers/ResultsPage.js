import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, loadMoreSearch, loadExtraInfo } from '../actions'
import Result from '../components/Result'
import List from '../components/List'
import _ from 'lodash';

class ResultsPage extends Component {
  constructor(props) {
    super(props)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    const {query, search} = this.props;
    search(query);
  }

  componentWillReceiveProps(nextProps) {
    const { search } = this.props;
    if (nextProps.query !== this.props.query) {
      search(nextProps.query);
    }
  }

  renderResult(entities, key) {
    return (
      <Result key={key} result={entities[key]} />
    )
  }

  render() {
    const { searchResults, isFetching, entities } = this.props
    // @TODO figure out why `searchResults` is undefined when `isFetching` is false
    if (isFetching || _.isUndefined(searchResults)) {
      return <h1>Loading</h1>
    }
    return (
      <List renderItem={this.renderResult}
            keys={searchResults.catalog}
            values={entities}
            isFetching={isFetching}
            currentPage={searchResults.page}
            totalPages={searchResults.totalPages} />
    )
  }
}

ResultsPage.propTypes = {
  searchResults: PropTypes.object,
  search: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { query } = ownProps.params
  const { searchResults, entities } = state;

  return {
    entities,
    searchResults: searchResults[query.toLowerCase()],
    query,
    isFetching: searchResults.isFetching
  }
}

export default connect(mapStateToProps, {
  search,
  loadMoreSearch,
  loadExtraInfo
})(ResultsPage)
