import Form from './common/form'
import { getGenres } from '../services/fakeGenreService'
import { getMovies } from '../services/fakeMovieService'
import Joi from 'joi-browser'
class MovieForm extends Form {
    state = {
        data: {title: '', numberInStock: null, rate: null},
        errors: {},
        genre: 'Action'
    }

    schema = {
        title: Joi.string().required().label('Title'),
        numberInStock: Joi.number().min(0).max(100),
        rate: Joi.number().min(0).max(10)
    }

    onGenreChange = e => {
        this.setState({genre: e.currentTarget.value})
    }

    doSubmit = () => {
        const movies = getMovies()
        const {title, numberInStock, rate} = this.state.data
        movies.push({
            _id: "32311341",
            title,
            genre: this.state.genre,
            numberInStock,
            dailyRentalRate: rate
        })
        
    }

    render() {
        return (
            <div>
                <h1>Add new movie</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    <label>Genre</label>
                    <select onChange={this.onGenreChange} value={this.state.genre} name="genres" id="genres" className="form-control mb-3">
                        {
                            getGenres().map(genre => <option key={genre._id}>{genre.name}</option>)
                        }
                    </select>
                    {this.renderInput('numberInStock', 'Number in stock')}
                    {this.renderInput('rate', 'Rate')}
                    {this.renderButton('Add')}
                </form>
            </div>
        );
    }
}

export {MovieForm};