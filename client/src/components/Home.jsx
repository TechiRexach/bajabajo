import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DEV_URL } from '../utilities/constants'
import Navbar from './Navbar';


function Home(){

    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')

    function getData(){
        
        axios.get(`${DEV_URL }/api/search/${searchInput}/${page}`)
        .then(response => {
            setMovies(response.data.data.Search)
        })
        .catch(err => {
            setError(err.response.data.message)
            setTimeout(() => {
                setError()
                setSearchInput('')
            }, 2000)
        })
    }

    const onSearchInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }

    const onPageChangeUp = (e) => {
        e.preventDefault();
        setPage(oldPage => oldPage + 1)
    }

    const onPageChangeDown = (e) => {
        e.preventDefault();
        setPage(oldPage => oldPage - 1)
    }

    useEffect(() => {
        getData()
    },[page])

    function reset(){
        setMovies([])
        setSearchInput('')
        setPage(1)
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
                    <h1 className='mt-5'>¿Qué película quieres buscar?</h1>
                    <input name='title' value={searchInput} onChange={onSearchInput} className='inputfilm form-control mt-5 mb-3' placeholder='Escribre un título...'/>
                    <div className='homeButtons justify-content-center'>
                        <button type='submit' onClick={getData} className='btn btn-outline-secondary mb-2 searchButton'>Buscar</button>
                        <button type='submit' onClick={reset} className='btn btn-outline-danger mb-5 resetButton'>Limpiar</button>
                    </div>
                </div>
                {error && <h4>Sorry! {error}</h4>}
                <div>
                    {movies && movies.map(movie => (
                        <Link key={movie.imdbID} to={`/film/${movie.imdbID}`} props={movie} className='link-secondary'>
                            <p>{movie.Title}</p>
                            <img src={movie.Poster} alt="Poster" className='mb-4'/>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='pages'>
                <nav aria-label="Page navigation fixed-bottom">
                    <ul className="pagination justify-content-center">
                        <li className="page-item mb-4 mt-5">
                            <p className="page-link" onClick={onPageChangeDown}>
                                <span className='text-dark'>Prev</span>
                            </p>
                        </li>
                        <li className="page-item mb-4 mt-5 disabled"><p className="page-link text-dark">{page}</p></li>
                        <li className="page-item mb-4 mt-5">
                            <p className="page-link" onClick={onPageChangeUp}>
                                <span className='text-dark'>Next</span>
                            </p>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Home;