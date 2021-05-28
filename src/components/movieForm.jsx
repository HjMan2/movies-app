import Form from './common/form'
import { getGenres } from '../services/fakeGenreService'
import { getMovie, saveMovie } from '../services/fakeMovieService'
import Joi from 'joi-browser'
class MovieForm extends Form {
    state = {
        data: {
            title: '', 
            numberInStock: '', 
            dailyRentalRate: '',
            genreId: ''
        },
        errors: {},
        genres: []
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100),
        dailyRentalRate: Joi.number().required().min(0).max(10)
    }
    componentDidMount() {
        const genres = getGenres()
        this.setState({genres})
        const movieId = this.props.match.params.id
        if(movieId === 'new') return;
        const movie = getMovie(movieId)
        if(!movie) return this.props.history.replace('/not-found')
        this.setState({data: this.mapToViewModel(movie)})
    }

    mapToViewModel(movie) {
        console.log({
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        })
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = () => {
        saveMovie(this.state.data)
        this.props.history.push('/movies')
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput('numberInStock', "Number in Stock", "number")}
                    {this.renderInput('dailyRentalRate', "Rate")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export {MovieForm};