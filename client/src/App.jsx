import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import PackageDetails from './pages/PackageDetails';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
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
import WishlistComponent from './pages/Wishlist';
import Failure from './pages/Failure';
import Sucess from './pages/Success';
import AdminManage from './pages/AdminManage';
import AdminDashboard from './pages/AdminDashboard';
import NewPackage from './pages/NewPackage';
import AddPackage from './pages/AddPackage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
        <Route path='/guide/packages' element={<NewPackage />} />
        <Route path='/guide/add-package' element={<AddPackage />} />
        <Route path='/guide/profile' element = {<Dashboard />} />
        <Route path='/blog/:blogId' element={<BlogDetails />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/manage' element = {<AdminManage />} />
        <Route path='/admin/profile' element = {<Dashboard />} />
        <Route path='/wishlist' element={<WishlistComponent />} />
        <Route path='/success' element={<Sucess />} />
        <Route path='/failure' element={<Failure />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;