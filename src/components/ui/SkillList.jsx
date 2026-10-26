const tones = {
  accent: "bg-accent/10 text-accent",
  inverse: "bg-on-accent/10 text-on-accent",
};

/**
 * @param {object} props
 * @param {string[]} props.skills
 * @param {keyof typeof tones} [props.tone='accent']
 * @param {'badge' | 'text'} [props.variant='badge']
 */
export default function SkillList({ skills, tone = "accent", variant = "badge" }) {
  const showBadges = variant === "badge";
  const textTone = tone === "inverse" ? "text-on-accent/85" : "text-muted";
  const listClassName = `mt-4 flex flex-wrap ${
    showBadges ? "gap-2" : "gap-x-5 gap-y-1"
  }`;
  const itemClassName = showBadges
    ? `rounded-full px-3 py-1 text-base font-medium leading-6 ${tones[tone]}`
    : `text-sm font-medium leading-relaxed ${textTone}`;

  return (
    <ul className={listClassName} aria-label="Skills">
      {skills.map((skill) => (
        <li key={skill} className={itemClassName}>
          {skill}
        </li>
      ))}
    </ul>
  );
}
