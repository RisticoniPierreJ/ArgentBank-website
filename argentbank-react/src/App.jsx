import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/main.css';

import Home from './Views/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes> 
    </Router>
  )
}

export default App;