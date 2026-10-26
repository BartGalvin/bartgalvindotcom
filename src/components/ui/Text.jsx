const sizes = {
  body: "text-lg leading-relaxed",
  small: "text-base leading-relaxed",
};

const tones = {
  muted: "text-muted",
  accent: "text-accent",
  inverse: "text-on-accent/85",
  inverseMuted: "text-on-accent/75",
};

/**
 * @param {object} props
 * @param {keyof typeof sizes} [props.size='body']
 * @param {keyof typeof tones} [props.tone='muted']
 * @param {string} [props.className='']
 * @param {*} props.children
 */
export default function Text({
  size = "body",
  tone = "muted",
  className = "",
  children,
}) {
  return (
    <p className={`${sizes[size]} ${tones[tone]} ${className}`}>{children}</p>
  );
}
