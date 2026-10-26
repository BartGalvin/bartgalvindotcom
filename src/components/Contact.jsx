import emailIcon from "../../assets/icons/email.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import githubIcon from "../../assets/icons/github.svg";
import Link from "./ui/Link.jsx";

export default function Contact({ profile }) {
  const links = [
    { icon: emailIcon, label: profile.email, href: `mailto:${profile.email}` },
    { icon: linkedinIcon, label: "LinkedIn", href: profile.linkedin },
    { icon: githubIcon, label: "GitHub", href: profile.github },
  ];

  return (
    <section
      className="flex flex-col items-center gap-4 py-10 sm:py-12 md:flex-row md:justify-center md:gap-10"
      id="contact"
      aria-label="Contact"
    >
      {links.map(({ icon, label, href }) => (
        <Link key={href} variant="contact" href={href}>
          <span
            className="contact-icon size-6 shrink-0"
            style={{ "--icon": `url("${icon}")` }}
            aria-hidden="true"
          />
          <span className="break-all">{label}</span>
        </Link>
      ))}
    </section>
  );
}
