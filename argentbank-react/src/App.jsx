import "./assets/css/main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Profile from "./views/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
