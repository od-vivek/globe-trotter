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
import Guide from './pages/Guide';
import DestinationMap from './pages/DestinationMap';
import ConfirmPaymentPage from './pages/ConfirmPayment';
import './App.css';
import 'leaflet/dist/leaflet.css';
import AboutUs from './pages/AboutUs';
import GuideSignup from './pages/GuideSignup';
import GuideLogin from './pages/GuideLogin';
import GuideDashboard from './pages/GuideDashboard';
import GuideBlogs from './pages/GuideBlogs';
import BlogForm from './pages/BlogForm';
import BlogDetails from './pages/BlogDetails';
import AdminDashboardPage from './pages/AdminDashboardPage';

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
        <Route path="/guide" element={<Guide />} />
        <Route path='/guide/signup' element={<GuideSignup />} />
        <Route path='/guide/login' element={<GuideLogin />} />
        <Route path='/guide/dashboard' element={<GuideDashboard />} />
        <Route path='/guide/blogs' element={<GuideBlogs />} />
        <Route path='/guide/add-blog' element={<BlogForm />} />
        <Route path='/blog/:blogId' element={<BlogDetails />} />
        <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;