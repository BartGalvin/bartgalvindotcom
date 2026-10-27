const variants = {
  text: "hover:text-accent hover:underline",
  button:
    "inline-flex items-center gap-6 rounded-sm bg-accent px-5 py-3 text-on-accent transition-colors hover:bg-ink",
  contact:
    "inline-flex min-h-11 max-w-full items-center gap-3 text-xl font-medium text-ink hover:text-accent hover:underline",
  brand: "inline-flex items-center gap-3 text-2xl font-semibold tracking-tight before:size-1.5 before:shrink-0 before:bg-accent before:content-[''] hover:text-accent",
};

const arrows = {
  right: "\u2192",
  up: "\u2191",
};

/**
 * @param {object} props
 * @param {string} props.href
 * @param {keyof typeof variants} [props.variant='text']
 * @param {keyof typeof arrows} [props.arrow]
 * @param {*} props.children
 */
export default function Link({ href, variant = "text", arrow, children }) {
  return (
    <a className={variants[variant]} href={href}>
      {children}
      {arrow && <span aria-hidden="true"> {arrows[arrow]}</span>}
    </a>
  );
}
