import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";
import Button from "../../components/Button/Button";

function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberME, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Utilise le hook useDispatch pour permettre l'envoi d'actions à Redux
    const dispatch = useDispatch();

    const { isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );

    // Fonction qui gère l'envoi de l'action de connexion à Redux lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password, rememberME }));
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
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberME}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button className="btn btnLarge" type={"submit"}>
                {loading ? "Loading..." : "Sign In"}
            </Button>
            {error && (
                <div className="errorMessage">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <p>{error}</p>
                </div>
            )}
        </form>
    );
}

export default LoginForm;
