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

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Include the Header component */}
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={Search} />
        <Route path="/destination/:destinationId" component={Destinations} />
        <Route path="/package/:packageId" component={PackageDetails} />
        <Route path="/payment" component={Payment} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
