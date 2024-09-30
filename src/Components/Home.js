import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chome from './Chome';
import About from './About';
import Contact from './Contact';
import Bank from './Bank'; // Separate page
import Login from './Login';
import Signup from './Signup';
import Index2 from './Index2';
import Link_acct from './Link_acct';
import Loan from './Loan';
import Bank_interface from './Bank_interface';
import Acct_verify from './Acct_verify';

function Home() {
  return (
    <Router>
      <Routes>
        {/* Routes for main application layout with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route index element={<Chome />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* Route for the standalone Bank page */}
        <Route path="/bank" element={<Bank />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/index" element={<Index2/>}/>
        <Route path="/logout" element={<Login/>}/>
        <Route path="/link_bank" element={<Link_acct/>}/>
        <Route path="/loan_request" element={<Loan/>}/>
        <Route path="/bank_interface" element={<Bank_interface/>}/>
        <Route path="/acct_verify" element={<Acct_verify/>}/>
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet /> {/* This will render the child route components */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
