import React from 'react';
import Footer from './Components/Footer/Footer';
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton';
import ScrollToTop from './Components/ScrollToTop/ScrolToTop'; 

import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <ScrollToTop /> 
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
