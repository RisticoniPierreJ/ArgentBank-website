import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";

function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Utilise le hook useDispatch pour permettre l'envoi d'actions à Redux
    const dispatch = useDispatch();

    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );

    // Fonction qui gère l'envoi de l'action de connexion à Redux lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    // Utilisation du hook useEffect pour effectuer des actions en réponse à des changements dans l'état de l'authentification
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="btn btnLarge" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default LoginForm;
