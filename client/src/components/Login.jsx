import { AUTH_TOKEN, DEV_URL } from '../utilities/constants'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utilities/authToken'
import axios from 'axios';
import Navbar from './Navbar';

function Login(){

    const [logedUser, setLogedUser] = useState({
        email: '',
        password: ''
    })

    const handleChangeInput = (event) => {
        setLogedUser({
            ...logedUser,
            [event.target.name]: event.target.value,
        })
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [welcome, setWelcome] = useState('');
    const history = useHistory();

    const login = (event) => {
        event.preventDefault()
        axios.post(`${DEV_URL}/auth/login`, {...logedUser})
        .then((response) => {
            setWelcome(response.data.message)

            const token = response.data.token;
            localStorage.setItem(AUTH_TOKEN, token)
            setAuthToken(token)

            setTimeout(() => {
                history.push('/profile')
            }, 2000)
        })
        .catch((err) => {
            setErrorMessage(err.response.data)
          
            setTimeout(() => {
                setErrorMessage()
            }, 2000)
        })
    };

    return(
        <div className='loginPage'>
            <Navbar />
            <p className='alert alert-secondary'>IDENTIFICATE</p>
            {welcome && <div className='alert alert-success'>{welcome}</div>}
            <form action="post" className='loginForm' onSubmit={login}>
                <input className='form-control inputfilm mb-2' type="email" name="email" value={logedUser.email} placeholder='Email:' onChange={handleChangeInput}/>
                <input className='form-control inputfilm mb-2' type="password" name="password" value={logedUser.password} placeholder='Contraseña:' onChange={handleChangeInput}/>
            </form>
            <button className='btn btn-outline-secondary mb-5' type='submit' onClick={login}>Enviar</button>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </div>
    );
};

export default Login;
