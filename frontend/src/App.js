
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Locations from './pages/Locations';
import NonProfits from './pages/NonProfits';
import FarmersMarkets from './pages/FarmersMarkets';
import MarketInstance from "./pages/MarketInstance/MarketInstance";
// import LocationInstance from "./pages/LocationInstance/LocationInstance";
// import NonprofitInstance from "./pages/NonprofitInstance/NonprofitInstanceance";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import MarketInstancePage from './pages/MarketInstance/MarketInstance';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/locations" element={<Locations/>} />
            <Route path="/nonprofits" element={<NonProfits/>} />
            <Route path="/farmersmarkets" element={<FarmersMarkets/>} />
            <Route path="/farmersmarkets/" element={<MarketInstance/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
