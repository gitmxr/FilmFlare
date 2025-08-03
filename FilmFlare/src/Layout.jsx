import React from 'react';
import Footer from './Components/Footer/Footer';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton';
import ScrollToTop from './Components/ScrollToTop/ScrolToTop'; 
import Header from './Components/Header/Header'; // Add Header
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <ScrollToTop /> 

      <Header /> {/* Show Header on all pages */}

      <main className="flex-grow">
        <Outlet /> {/* Render the current page (Home, Music, etc.) */}
      </main>

      <footer>
        <Footer />
      </footer>

      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
