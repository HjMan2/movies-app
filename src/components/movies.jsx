import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Pagination } from "./common/pagination";
import { Paginate } from "../utils/paginate";
import { ListGroup } from "./common/listgGroup";
import { getGenres } from "../services/fakeGenreService";
import { MoviesTable } from "./moviesTable";
import { Link, Route } from 'react-router-dom'
import _ from "lodash";
import { MovieForm } from "./movieForm";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage : 1,
    sortColumn: { path : 'title', order: 'asc'}
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  handleGenreSelecte = gener => {
    this.setState({ selectedGenre: gener, currentPage: 1 })

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
    const { currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn } = this.state
    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = Paginate(sorted, currentPage, pageSize)
    return { totalCount: filtered.length, data: movies}
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
        <p>Showing {totalCount} movies in the database.</p>
        <div className="mb-2">
          <button className="btn btn-primary"><Link to="/movies/new" className="text-body">Add Movie</Link></button>
          <Route path="/movies/new" component={MovieForm}></Route>
        </div>
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
