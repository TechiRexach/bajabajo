import { AUTH_TOKEN, DEV_URL } from '../utilities/constants'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utilities/authToken'
import Navbar from './Navbar';

function UserProfile(props){

    const history = useHistory()

    const [userFilms, setUserFilms] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setWellDone] = useState('');

    useEffect(() => {

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.get(`${DEV_URL}/api/catalog/likes`, config)
        .then(response => {
            setWellDone(response.data.message)
            setUserFilms(response.data.films)
        })
        .catch((error) => {
            setErrorMessage(error.response.data)
            localStorage.removeItem(AUTH_TOKEN)
            history.push('/login')
        })
    },[])


    const logOut = () => {
        localStorage.removeItem(AUTH_TOKEN)
        setAuthToken();
        setTimeout(() => {
            history.push('/')
        }, 2000)
    }

    return(
        <div >
         <Navbar />
            <div >
                {wellDone && <p className='alert alert-secondary'>{wellDone}</p>}
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                <div className='list-group list-group-flush inputfilm'>
                    {userFilms.map(pelicula => (
                        <div key={pelicula._id} className='list-group-item'>{pelicula.title}</div>
                    ))}
                </div>
            </div>
            <button className='btn btn-outline-secondary mt-5' type='submit' onClick={logOut}>Cerrar Sesión</button>
        </div>
    );
};

export default UserProfile;