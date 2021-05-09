import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, DEV_URL } from '../utilities/constants';
import Navbar from './Navbar';


function OneFilm(props){

    const movieID = props.match.params.id

    const [movie, setMovie] = useState({});
    const [wellDone, setWellDone] = useState('');
    const [error, setError] = useState('');

    useEffect (() => {
        axios.get(`${DEV_URL}/api/film/${movieID}`)
        .then(response => {
            setMovie(response.data.selectedFilm)
        })
        .catch(err => {
            setError(err.response.data.message)
            setTimeout(() => {
                setError()
            }, 2000)
        })
    },[movieID])

    function addFilm(){
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.post(`${DEV_URL}/api/catalog`, {...movie}, config)
        .then(response => {
            setWellDone(response.data.message)
            setTimeout(() => {
                setWellDone()
            }, 2000)
        })
        .catch(error => {
            setError(error.response.data)
            setTimeout(() => {
                setError()
            }, 2000)
        })
    }

    return(
        <div >
            <Navbar />
            <h4 className='mb-5 text-decoration-underline'>{movie.Title}</h4>
            <img src={movie.Poster} alt="Poster"/>
            {error && <h5 className='mt-4 text-danger'>{error}</h5>}
            <div>
                <button onClick={addFilm} className='btn btn-outline-secondary mt-3 mb-5'>
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            {wellDone && <h6 className='text-success'>{wellDone}</h6>}
            <table class="table">
                <thead>
                    <tr>
                    <th colSpan="2">SINOPSIS</th>
                    </tr>
                    <tr>
                    <th colSpan="2" className='fst-italic'>{movie.Plot}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">Año</th>
                    <td>{movie.Year}</td>
                    </tr>
                    <tr>
                    <th scope="row">Puntuación IMDB</th>
                    <td>{movie.imdbRating}</td>
                    </tr>
                    <tr>
                    <th scope="row">Pais</th>
                    <td>{movie.Country}</td>
                    </tr>
                    <tr>
                    <th scope="row">Productora</th>
                    <td>{movie.Production}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OneFilm;