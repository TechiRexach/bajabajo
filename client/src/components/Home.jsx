import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEV_URL } from '../utilities/constants'
import Navbar from './Navbar';


function Home(){

    const [searchInput, setSearchInput] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')

    function getData(){
        axios.get(`${DEV_URL }/api/search/${searchInput}`)
        .then(response => {
            setMovies(response.data.data.Search)
        })
        // .catch(err => {
        //     console.log(err)
        //     if(err === undefined){
        //         setError('No existe ninguna pelicula con ese título')
        //     }
            
        // })
    }

    const onSearchInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }
      
    return(
        <div >
            <Navbar />
            <div className='home'>
                <div>
                    <div className='rallas'>
                        <div className='rallasUp'></div>
                        <div className='rallasDown'></div>
                    </div>
                    <h1 className='mt-5'>Peliculas</h1>
                    <input name='title' value={searchInput} onChange={onSearchInput} className='inputfilm form-control mt-5 mb-3'/>
                    <button type='submit' onClick={getData} className='btn btn-outline-secondary mb-5'>Search</button>
                </div>
                <div>
                    {movies && movies.map(movie => (
                        <Link key={movie.imdbID} to={`/film/${movie.imdbID}`} props={movie}>
                            <p>{movie.Title}</p>
                            <img src={movie.Poster} alt="Poster" className='mb-4'/>
                        </Link>
                    ))}

                </div>
            </div>
            {error && <h4>Sorry! {error}</h4>}
        </div>
    )
}

export default Home;