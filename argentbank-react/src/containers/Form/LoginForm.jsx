import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";
import { fetchUserProfile } from "../../features/user/userActions";

function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, loading, token, error } = useSelector(
        (state) => state.auth
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchUserProfile(token)).then(() => {
                navigate("/profile");
            });
        }
    }, [isAuthenticated, token, dispatch, navigate]);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate("/profile");
    //     }
    // }, [isAuthenticated, navigate]);

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
