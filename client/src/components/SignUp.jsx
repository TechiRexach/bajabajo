import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, DEV_URL } from '../utilities/constants'
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utilities/authToken';
import Navbar from './Navbar';

function Register(){

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [welcome, setWelcome] = useState('');
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    });

    const handleChangeInputs = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const enviarDatos = (event) => {
        event.preventDefault()
        axios.post(`${DEV_URL }/auth/signup`, {...newUser})
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
        <div className='registerPage'>
            <Navbar />
            <p className='alert alert-secondary'>REGISTRATE</p>
            {welcome && <div className='alert alert-success'>{welcome}</div>}
            <form action="post" className='registerForm' onSubmit={enviarDatos}>
                <input className='form-control inputfilm mb-2' type="email" name="email" value={newUser.email} placeholder='Email:'onChange={handleChangeInputs}/>
                <input className='form-control inputfilm mb-2' type="password" name="password" value={newUser.password} placeholder='Contraseña:' onChange={handleChangeInputs}/>
            </form>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            <button className='btn btn-outline-secondary mb-5' type='submit' onClick={enviarDatos}>Enviar</button>
        </div>
    );
};

export default Register;