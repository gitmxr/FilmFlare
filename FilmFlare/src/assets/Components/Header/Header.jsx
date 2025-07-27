import React from "react";
import { Link } from "react-router-dom";
import logo from '/src/assets/images/filmflare-logo.webp'; 

function Header() {
  return (
    <div className="flex bg-gray-800 text-white p-4">
      <div>
        <img
          src={logo}
          alt="FilmFlare Logo"
          className="h-9 w-9 inline-block mr-2 mb-2 rounded-full"
        />
        <span className="text-2xl font-bold">FilmFlare</span>
      </div>
      <div className="ml-auto">
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/about" className="mr-2">
          About
        </Link>
        <Link to="/contact" className="mr-2">
          Contact
        </Link>
      </div>
    </div>
  );
}

export default Header;
