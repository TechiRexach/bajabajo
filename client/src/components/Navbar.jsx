import { Link } from 'react-router-dom';

function NavBar(){

    return(
        <nav className="nav justify-content-center mt-3 mb-4">
            <Link class="nav-link text-dark" to={'/'}>Home</Link>
            <Link class="nav-link text-dark" to={'/signup'}>Registro</Link>
            <Link class="nav-link text-dark" to={'/login'}>Acceso</Link>
            <Link class="nav-link text-dark" to={'/profile'}>Perfil</Link>
        </nav>
    );
};

export default NavBar;
