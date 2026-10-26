const tones = {
  accent: "text-accent",
  inherit: "text-inherit",
};

/**
 * @param {object} props
 * @param {keyof typeof tones} [props.tone='accent']
 * @param {*} props.children
 */
export default function SectionLabel({ tone = "accent", children }) {
  return (
    <p
      className={`text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </p>
  );
}
