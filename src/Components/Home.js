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
import Loan_ui from './Loan_ui';
import A_dash from './A_dashboard';
import Bhome from './Bank_home';
import Manage_profile from './Manage_profile';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toasts
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';



function Home() {
  return (
    <div>
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
        <Route path="/loan_request" element={<Loan_ui/>}/>
        <Route path="/bank_interface" element={<Bank_interface/>}/>
        <Route path="/acct_verify" element={<Acct_verify/>}/>
        <Route path="/aindex" element={<A_dash/>}/>
        <Route path="/bhome" element={<Bhome/>}/>
        <Route path="/profile_interface" element={<Manage_profile/>}/>
      </Routes>
    </Router>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition= {Bounce}
/>
    </div>
  );
}

function MainLayout() {
  return (
    <div className='main-container'>
      <Navbar />
      <div className="content">
        <Outlet /> {/* This will render the child route components */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
