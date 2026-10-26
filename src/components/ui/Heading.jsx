const variants = {
  hero: "text-hero-mobile font-semibold leading-[1.04] tracking-[-0.055em] text-balance sm:text-hero",
  feature: "font-editorial text-feature font-normal leading-[1.12] tracking-[-0.035em] text-balance",
  section: "text-section font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted",
  entry: "text-2xl font-semibold leading-snug",
};

/**
 * @param {object} props
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.as='h2']
 * @param {keyof typeof variants} [props.variant='section']
 * @param {string} [props.id]
 * @param {string} [props.className='']
 * @param {*} props.children
 */
export default function Heading({
  as = "h2",
  variant = "section",
  id,
  className = "",
  children,
}) {
  const Tag = as;

  return (
    <Tag id={id} className={`${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
