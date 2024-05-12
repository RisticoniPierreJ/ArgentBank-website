import "./assets/css/main.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";

import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Admin from "./views/Admin";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
