import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { search, loadMoreSearch } from '../actions'
import Result from '../components/Result'
import List from '../components/List'
import zip from 'lodash/zip'

// function search(props) {
//   const { query } = props
//   props.search(query)
// }

class ResultsPage extends Component {
  constructor(props) {
    super(props)
    // this.renderRepo = this.renderRepo.bind(this)
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
    const { loadMoreSearch, query, searchEntity } = this.props;

    loadMoreSearch(query, searchEntity.page + 1);
  }

  renderResult(result) {
    return (
      <Result key={result.id} result={result} />
    )
  }

  render() {
    const { searchEntity } = this.props
    // if (!person) {
    //   return <h1>Loading</h1>
    // }

    // const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div>
        <p>Total results: {searchEntity.totalResults}</p>
        {searchEntity.results && <p>Loaded results: {searchEntity.results.length}</p>}
        <hr />
        <List renderItem={this.renderResult}
              items={searchEntity.results}
              isFetching={searchEntity.isFetching}
              currentPage={searchEntity.page}
              totalPages={searchEntity.totalPages}
              onLoadMoreClick={this.handleLoadMoreClick} />
      </div>
    )
  }
}

ResultsPage.propTypes = {
  // login: PropTypes.string.isRequired,
  searchResults: PropTypes.object,
  // starredPagination: PropTypes.object,
  // starredRepos: PropTypes.array.isRequired,
  // starredRepoOwners: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  // loadStarred: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { query } = ownProps.params
  const { searchEntity } = state.entities

  // const starredPagination = starredByUser[login] || { ids: [] }
  // const starredRepos = starredPagination.ids.map(id => repos[id])
  // const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    searchEntity,
    query
    // starredRepos,
    // starredRepoOwners,
    // starredPagination,
    // user: users[login]
  }
}

export default connect(mapStateToProps, {
  search,
  loadMoreSearch
})(ResultsPage)
