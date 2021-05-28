import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Pagination } from "./common/pagination";
import { Paginate } from "../utils/paginate";
import { ListGroup } from "./common/listgGroup";
import { getGenres } from "../services/fakeGenreService";
import { MoviesTable } from "./moviesTable";
import { Link, Route } from 'react-router-dom'
import { SearchBox } from './common/searchBox'
import _ from "lodash";
import { MovieForm } from "./movieForm";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage : 1,
    sortColumn: { path : 'title', order: 'asc'},
    searchQuery: '',
    selectedGenre: null
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  
  handlePageChange = page => {
    this.setState({currentPage: page})
  }
  
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  
  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const { currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn, searchQuery } = this.state
    let filtered = allMovies
    if(searchQuery) {
      filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    } else if(selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m=> m.genre._id === selectedGenre._id)
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = Paginate(sorted, currentPage, pageSize)
    return { totalCount: filtered.length, data: movies}
  }

  handleGenreSelecte = (genre) => {
    this.setState({searchQuery: '', selectedGenre: genre, currentPage: 1})
  }

  handleSearch = (query) => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1})
  }

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state

    if (count === 0) return <p>There are no movies in the database.</p>;

    const {totalCount, data: movies } = this.getPagedData()

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup 
          items={this.state.genres}
          onItemSelect={this.handleGenreSelecte}
          selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
        <Link className="btn btn-primary mb-3" to="/movies/new">
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database.</p>
        <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}/>
        <MoviesTable 
        onDelete={this.handleDelete} 
        onLike={this.handleLike} 
        movies={movies}
        onSort={this.handleSort}
        sortColumn={sortColumn}
        />
        <Pagination 
        itemsCount={totalCount} 
        pageSize={pageSize} 
        onPageChange={this.handlePageChange}
        currentPage={currentPage}
        />

        </div>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default Movies;
