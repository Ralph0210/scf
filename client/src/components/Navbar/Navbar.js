import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [activeLink, setActiveLink] = useState('home');

    const handleNavClick = (link) => {
        setActiveLink(link); // Set the active link when clicked
      };

      useEffect(() => {
        // Get references to the .active and li elements
        const activeLinkElement = document.querySelector('.navlink.active li');
        const liElements = document.querySelectorAll('.nav .navlink:not(.active) li');
    
        // Function to change the color of the active link to black
        const changeActiveLinkColor = () => {
          activeLinkElement.style.color = '#7C9CBF';
        };
    
        // Add event listeners to li elements
        liElements.forEach((liElement) => {
          liElement.addEventListener('mouseenter', changeActiveLinkColor);
          liElement.addEventListener('mouseleave', () => {
            if (activeLinkElement) {
              activeLinkElement.style.color = 'white'; // Reset color to its original state
            }
          });
        });
    
        // Clean up event listeners when the component unmounts
        return () => {
          liElements.forEach((liElement) => {
            liElement.removeEventListener('mouseenter', changeActiveLinkColor);
            liElement.removeEventListener('mouseleave', () => {
              if (activeLinkElement) {
                activeLinkElement.style.color = ''; // Reset color to its original state
              }
            });
          });
        };
      }, [activeLink]);

  const Nav = () => (
    <ul className='nav'>
        <Link to='/' className={`navlink home ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>
          <li className='nav-text'>Home</li>
        </Link>
        <Link to='/analyticsPage' className={`navlink analysis ${activeLink === 'analysis' ? 'active' : ''}`}
          onClick={() => handleNavClick('analysis')}>
          <li className='nav-text'>Analysis</li>
        </Link>
        <Link to='/exploreData'  className={`navlink exploreData ${activeLink === 'exploreData' ? 'active' : ''}`}
          onClick={() => handleNavClick('exploreData')}>
          <li className='nav-text'>Explore Data</li>
        </Link>
        <Link to='/about' className={`navlink about ${activeLink === 'about' ? 'active' : ''}`}
          onClick={() => handleNavClick('about')}>
          <li className='nav-text'>About</li>
        </Link>
      {/* <li>
        <div className='nav-text'>Search</div>
      </li>
      <li>
        <div className='nav-text'>EN</div>
      </li> */}
      <div className='animation'></div>
    </ul>
  );

  return (
    <nav>
      <div className='logo_container'>
        <div>SCF</div>
      </div>
      <div className='nav_container'>
        <Nav />
      </div>
    </nav>
  );
};

export default Navbar;
