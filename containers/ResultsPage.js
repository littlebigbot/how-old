import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, loadMoreSearch, loadExtraInfo } from '../actions'
import Result from '../components/Result'
import List from '../components/List'

class ResultsPage extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
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

  handleLoadMoreClick() {
    console.log(this.props)
    const { loadMoreSearch, query, searchResults } = this.props;

    loadMoreSearch(query, searchResults.page + 1);
  }

  renderResult(result) {
    return (
      <Result key={result.id} result={result} />
    )
  }

  render() {
    const { searchResults } = this.props
    // if (!person) {
    //   return <h1>Loading</h1>
    // }

    return (
      <div>
        <p>Total results: {searchResults.totalResults}</p>
        {searchResults.results && <p>Loaded results: {searchResults.results.length}</p>}
        <hr />
        <List renderItem={this.renderResult}
              items={searchResults.catalog}
              isFetching={searchResults.isFetching}
              currentPage={searchResults.page}
              totalPages={searchResults.totalPages}
              onLoadMoreClick={this.handleLoadMoreClick} />
      </div>
    )
  }
}

ResultsPage.propTypes = {
  searchResults: PropTypes.object,
  search: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { query } = ownProps.params
  const { searchResults } = state;

  return {
    searchResults,
    query
  }
}

export default connect(mapStateToProps, {
  search,
  loadMoreSearch,
  loadExtraInfo
})(ResultsPage)
