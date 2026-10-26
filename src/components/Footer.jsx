import Link from "./ui/Link.jsx";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-line py-4 text-base text-muted">
      <Link href="#top" arrow="up">
        Back to top
      </Link>
    </footer>
  );
}
