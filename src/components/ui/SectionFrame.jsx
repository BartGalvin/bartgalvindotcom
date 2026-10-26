/**
 * The caller supplies a heading with an id matching `${id}-heading`.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {*} props.label
 * @param {string} [props.className='']
 * @param {*} props.children
 */
export default function SectionFrame({ id, label, className = "", children }) {
  return (
    <section
      id={id}
      className={`flex flex-col border-line md:flex-row md:gap-12 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="md:w-56 md:shrink-0">{label}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
