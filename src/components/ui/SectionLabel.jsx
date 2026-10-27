/**
 * @param {object} props
 * @param {*} props.children
 */
export default function SectionLabel({ children }) {
  return (
    <p
      className="text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-accent"
    >
      {children}
    </p>
  );
}
