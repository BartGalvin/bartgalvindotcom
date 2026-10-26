import Link from "./ui/Link.jsx";

export default function Header({ name }) {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:bg-paper focus:p-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-line py-6">
        <Link variant="brand" href="#top">
          {name}
        </Link>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted sm:gap-x-8"
          aria-label="Main navigation"
        >
          <Link href="#entrepreneurship">Entrepreneurship</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
