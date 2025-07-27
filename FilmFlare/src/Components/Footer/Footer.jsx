import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        {/* Column 1: Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-white mb-2">🎬 FilmFlare</h2>
          <p className="text-sm text-gray-400">
            Discover the latest movies, watch trailers, and explore top-rated films.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-red-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-600 transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-600 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-white mb-2">Follow Me</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/gitmxr" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
              <FaGithub size={22} />
            </a>
            <a href="https://linkedin.com/in/riazdev18" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
              <FaLinkedin size={22} />
            </a>
            <a href="mailto:riazdev18@gmail.com" className="hover:text-red-600 transition">
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 <span className="text-white font-semibold">FilmFlare</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
