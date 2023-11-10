import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Destinations from './pages/Destinations';
import PackageDetails from './pages/PackageDetails';
import Payment from './pages/Payment';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={Search} />
        <Route path="/destination/:destinationId" element={Destinations} />
        <Route path="/package/:packageId" element={PackageDetails} />
        <Route path="/payment" element={Payment} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
