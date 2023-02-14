import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo.svg';
import AuthContext from '../store/AuthContext';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const userIsLoggedIn = authCtx.isLoggedIn;

    const user = localStorage.getItem("username");

    const logoutHandler = () => {
        authCtx.logout();
    }


    return <nav className="navbar navbar-expand-lg navbar-light px-5">
        <Link to='/home'>
            <img src={logo} alt="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
            <ul className="navbar-nav align-items-end ">
                {userIsLoggedIn && (
                    <>
                        <Link to="/register" className="text-dark p-2  border-0">Register</Link>
                        <Link to="/addcampground" className="text-dark p-2  border-0">Add Campground</Link>
                        <Link to="/campground" className="text-dark p-2 rounded border-0">Campground</Link>
                        <Link className="text-dark p-2 rounded border-0 font-weight-bold">{user && user}</Link>
                        <Link to="/" className="text-dark p-2 rounded border-0" onClick={logoutHandler}>Logout</Link>
                    </>
                )}

            </ul>
        </div>
    </nav>
}
export default MainNavigation