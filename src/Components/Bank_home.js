import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Bhome.css';

import slide0 from '../Images/slide0.jpg';
import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';

class Bhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      currentSlide: 0
    };

    this.slides = [slide0, slide1, slide2, slide3];
    this.servicesRef = React.createRef();
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  };

  componentDidMount() {
    this.slideInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentSlide: (prevState.currentSlide + 1) % this.slides.length
      }));
    }, 3000);
  }

  componentWillUnmount() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  scrollToServices = () => {
    if (this.servicesRef.current) {
      this.servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  Bnavbar = () => {
    return (
      <div className="bnavbar">
        <nav className="navbar2">
          <div className="title2">
            <Link to="/bhome" className="brand-logo">
              VIRTUAL BANK
            </Link>
          </div>
          <button
            className="menu-toggle"
            aria-label="Toggle Menu"
            onClick={this.toggleMenu}
          >
            &#9776;
          </button>
          <ul className={`nav-items2 ${this.state.menuOpen ? 'show' : ''}`}>
            <li className="nav-item2">
              <Link to="/bank" className="nav-link">
                Create Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  ImageSlideshow = () => {
    const { currentSlide } = this.state;

    return (
      <div className='slideshow-container'>
        <div
          className='slides'
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {this.slides.map((image, index) => (
            <div key={index} className='slide-wrapper'>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className='slide'
              />
            </div>
          ))}
        </div>
        <div className="slide-indicators">
          {this.slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => this.setState({ currentSlide: index })}
            />
          ))}
        </div>
      </div>
    );
  };

  Footer = () => {
    return (
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/bhome">Home</Link></li>
              <li><Link to="/bank">Open Account</Link></li>
              <li><Link to="/services">Our Services</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Customer Support: 1-800-VIRTUAL</p>
            <p>Email: support@virtualbank.com</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Virtual Bank. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };

  ServicesSection = () => {
    const services = [
      {
        title: "Personal Banking",
        description: "Tailored financial solutions for individuals, including savings accounts, personal loans, and investment options.",
        icon: "icon-personal"
      },
      {
        title: "Business Banking",
        description: "Comprehensive banking services designed to support and grow your business, from startup to enterprise.",
        icon: "icon-business"
      },
      {
        title: "Digital Banking",
        description: "Seamless online and mobile banking experience with advanced security features and 24/7 access.",
        icon: "icon-digital"
      },
      {
        title: "Investment Services",
        description: "Expert financial advice and diverse investment products to help you achieve your financial goals.",
        icon: "icon-investment"
      }
    ];

    return (
      <div ref={this.servicesRef} className="detailed-services-section">
        <div className="services-header">
          <h2>Our Comprehensive Banking Services</h2>
          <p>Empowering your financial journey with innovative solutions</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className={`service-icon ${service.icon}`}></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/services" className="service-link">Learn More</Link>
            </div>
          ))}
        </div>
        <div className="about-bank">
          <h2>About Virtual Bank</h2>
          <p>
            Virtual Bank is more than just a financial institution. We are your trusted partner in achieving financial success. 
            With over two decades of experience, we pride ourselves on providing personalized, innovative banking solutions 
            that adapt to your unique financial needs. Our commitment to technology, security, and customer satisfaction 
            sets us apart in the modern banking landscape.
          </p>
          <div className="bank-stats">
            <div className="stat">
              <h3>20+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat">
              <h3>500K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>99.9%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='main-container'>
        {this.Bnavbar()}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Virtual Bank</h1>
            <p>Your trusted financial partner for seamless banking experiences</p>
            <div className="hero-actions">
              <Link to="/bank" className="btn btn-primary">Open Account</Link>
              <button 
                onClick={this.scrollToServices} 
                className="btn btn-secondary"
              >
                Our Services
              </button>
            </div>
          </div>
          {this.ImageSlideshow()}
        </div>
        <div className="features-section">
          <div className="feature">
            <i className="icon-secure"></i>
            <h3>Secure Banking</h3>
            <p>Advanced security measures to protect your finances</p>
          </div>
          <div className="feature">
            <i className="icon-mobile"></i>
            <h3>Mobile Banking</h3>
            <p>Manage your accounts anytime, anywhere</p>
          </div>
          <div className="feature">
            <i className="icon-support"></i>
            <h3>24/7 Support</h3>
            <p>Customer support always available</p>
          </div>
        </div>
        {this.ServicesSection()}
        {this.Footer()}
      </div>
    );
  }
}

export default Bhome;