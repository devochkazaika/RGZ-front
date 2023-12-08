import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Nava from "./components/navbar"
import Pcs from "./pages/Pcs"
import Main from "./pages/Main"
import Home from "./pages/Home"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  return (
    
    <Router>
      
      <Nava />
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/pcs' element={<Pcs/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
    </Router>
    // <div>ssss</div>
  );
}

export default App;