import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

const ContactForm = dynamic(() => import("@/components/contact/ContactForm"));

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact the CineFilly team for support, feedback, partnership inquiries, or general questions.",
  path: "/contact",
});

const contactTopics = [
  {
    title: "General questions",
    description:
      "Ask about how CineFilly works, what content is available, or how to find titles on the platform.",
  },
  {
    title: "Feedback & suggestions",
    description:
      "Share ideas for new features, browse filters, or improvements to the discovery experience.",
  },
  {
    title: "Report an issue",
    description:
      "Let us know if something looks incorrect, a link is broken, or a page is not loading as expected.",
  },
  {
    title: "Partnerships & press",
    description:
      "Reach out for collaboration, media inquiries, or other business-related messages.",
  },
];

const socialLinks = [
  {
    href: "mailto:riazdev18@gmail.com",
    label: "Email",
    value: "riazdev18@gmail.com",
    icon: FaEnvelope,
    external: false,
  },
  {
    href: "https://github.com/gitmxr",
    label: "GitHub",
    value: "@gitmxr",
    icon: FaGithub,
    external: true,
  },
  {
    href: "https://linkedin.com/in/riazdev18",
    label: "LinkedIn",
    value: "riazdev18",
    icon: FaLinkedin,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">
            Contact
          </p>
          <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
            Whether you have a question, spotted something that needs fixing, or
            want to share feedback — our team is here to help. Choose the option
            that works best for you below.
          </p>
        </header>

        <section aria-labelledby="topics-heading" className="mb-10">
          <h2 id="topics-heading" className="sr-only">
            What can we help with?
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {contactTopics.map((topic) => (
              <li
                key={topic.title}
                className="rounded-xl border border-white/10 bg-gray-800/50 p-5"
              >
                <h3 className="font-semibold text-white">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {topic.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="reach-heading" className="mb-10">
          <h2
            id="reach-heading"
            className="mb-4 text-xl font-semibold text-white sm:text-2xl"
          >
            Other ways to reach us
          </h2>
          <ul className="space-y-3">
            {socialLinks.map(({ href, label, value, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-gray-800/50 px-5 py-4 transition hover:border-red-500/40 hover:bg-gray-800"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-gray-400">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            We aim to respond to all inquiries within 1–2 business days.
          </p>
        </section>

        <section
          aria-labelledby="form-heading"
          className="rounded-xl border border-white/10 bg-gray-800/30 p-6 sm:p-8"
        >
          <h2
            id="form-heading"
            className="mb-1 text-xl font-semibold text-white sm:text-2xl"
          >
            Send a message
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Fill out the form and your email client will open with your message
            pre-filled. No account required.
          </p>
          <ContactForm />
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block text-sm font-medium text-gray-400 transition hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
