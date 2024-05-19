import "./Navbar.css";
import argentBankLogo from "../../assets/img/argentBankLogo.png";

import { Link, useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authActions";

function Navbar() {
    const navigate = useNavigate();

    // Utilise le hook useSelector pour accéder aux états  
    const { user } = useSelector((state) => state.user);
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Utilise le hook useDispatch pour permettre l'envoi d'actions à Redux
    const dispatch = useDispatch();
    
    // Fonction qui gère l'envoi de l'action de déconnexion à Redux lors du clic sur le bouton de déconnexion
    const handleLogout = () => {
        dispatch(logout()); 
        navigate("/"); 
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <div className="main-nav-all-item" >
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                            {user.userName}
                        </Link>
                        <span className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </span>
                    </div>
                ) : (
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
