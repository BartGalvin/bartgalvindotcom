const sizes = {
  body: "text-lg leading-relaxed",
  small: "text-base leading-relaxed",
};

/**
 * @param {object} props
 * @param {keyof typeof sizes} [props.size='body']
 * @param {string} [props.className='']
 * @param {*} props.children
 */
export default function Text({ size = "body", className = "", children }) {
  return (
    <p className={`${sizes[size]} text-muted ${className}`}>{children}</p>
  );
}
