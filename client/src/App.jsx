import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import PackageDetails from './pages/PackageDetails';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import GuideDashboard from './pages/GuideDashboard';
import DestinationMap from './pages/DestinationMap';
import ConfirmPaymentPage from './pages/ConfirmPayment';
import './App.css';
import 'leaflet/dist/leaflet.css';
import AboutUs from './pages/AboutUs';
import GuideSignup from './pages/GuideSignup';
import GuideLogin from './pages/GuideLogin';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map/:destinationName" element={<DestinationMap />} />
        <Route path="/package/:packageId" element={<PackageDetails />} />
        <Route path='/confirm/:packageId' element={<ConfirmPaymentPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/guide" element={<GuideDashboard />} />
        <Route path='/guide/signup' element={<GuideSignup />} />
        <Route path='/guide/login' element={<GuideLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
