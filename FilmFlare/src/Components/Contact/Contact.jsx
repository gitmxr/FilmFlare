import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 border-l-4 border-red-600 pl-4">
          Contact Me
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          💬 Have a question, suggestion, or just want to say hi? Feel free to
          reach out via the platforms below.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-lg">
          <a
            href="https://github.com/gitmxr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <FaGithub size={20} /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/riazdev18"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a
            href="mailto:riazdev18@@gmail.com"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <FaEnvelope size={20} /> Email
          </a>
        </div>

        <p className="text-gray-500 mt-6 text-sm">
          ⏳ Typically responds within 24 hours.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-200 shadow-md"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
