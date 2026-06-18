import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const ContactForm = dynamic(() => import("@/components/contact/ContactForm"));

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the FilmFlare team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 border-l-4 border-red-600 pl-4 text-4xl font-bold text-yellow-400">
          Contact Me
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          💬 Have a question, suggestion, or just want to say hi? Feel free to
          reach out via the platforms below or send a message directly.
        </p>

        <div className="flex flex-col gap-4 text-lg sm:flex-row sm:items-center">
          <a
            href="https://github.com/gitmxr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 transition duration-200 hover:text-red-500"
          >
            <FaGithub size={20} /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/riazdev18"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 transition duration-200 hover:text-red-500"
          >
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a
            href="mailto:riazdev18@gmail.com"
            aria-label="Email"
            className="flex items-center gap-2 transition duration-200 hover:text-red-500"
          >
            <FaEnvelope size={20} /> Email
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          ⏳ Typically responds within 24 hours.
        </p>

        <ContactForm />

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-full bg-red-600 px-6 py-2 text-white shadow-md transition duration-200 hover:bg-red-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
