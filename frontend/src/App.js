
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Locations from './pages/Locations';
import NonProfits from './pages/NonProfits';
import FarmersMarkets from './pages/FarmersMarkets';
import MarketInstanceOne from "./pages/MarketInstance/MarketInstanceOne";
import MarketInstanceTwo from "./pages/MarketInstance/MarketInstanceTwo";
import MarketInstanceThree from "./pages/MarketInstance/MarketInstanceThree";
import LocationInstanceOne from "./pages/LocationInstance/LocationInstanceOne";
import LocationInstanceTwo from "./pages/LocationInstance/LocationInstanceTwo";
import LocationInstanceThree from "./pages/LocationInstance/LocationInstanceThree";
import NonprofitInstanceOne from "./pages/NonprofitInstance/NonprofitInstanceOne";
import NonprofitInstanceTwo from "./pages/NonprofitInstance/NonprofitInstanceTwo";
import NonprofitInstanceThree from "./pages/NonprofitInstance/NonprofitInstanceThree";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import LocationInstance from "./pages/LocationInstance/LocationInstance";

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
            {/* <Route path="/MarketInstance/MarketInstanceOne" element={<MarketInstanceOne/>} />
            <Route path="/MarketInstance/MarketInstanceTwo" element={<MarketInstanceTwo/>} />
            <Route path="/MarketInstance/MarketInstanceThree" element={<MarketInstanceThree/>} />
            <Route path="/LocationInstance/LocationInstanceOne" element={<LocationInstanceOne/>} />
            <Route path="/LocationInstance/LocationInstanceOne" element={<LocationInstanceTwo/>} />
            <Route path="/LocationInstance/LocationInstanceOne" element={<LocationInstanceThree/>} />
            <Route path="/NonProfitInstance/NonprofitInstanceOne" element={<NonprofitInstanceOne/>} />
            <Route path="/NonProfitInstance/NonprofitInstanceOne" element={<NonprofitInstanceTwo/>} /> */}
            <Route path="/NonProfitInstance/NonprofitInstanceOne" element={<NonprofitInstanceThree/>} />
            <Route path="/location/:id" element={<LocationInstance />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
