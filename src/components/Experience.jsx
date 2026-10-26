import Section from "./Section.jsx";
import Heading from "./ui/Heading.jsx";
import Text from "./ui/Text.jsx";
import SkillList from "./ui/SkillList.jsx";

export default function Experience({ content }) {
  const { title, entries } = content;

  return (
    <Section id="experience" title={title}>
      <div className="entry-list experience-list -m-4 divide-y divide-line">
        {entries.map((entry) => (
          <ExperienceEntry key={entry.organization} entry={entry} />
        ))}
      </div>
    </Section>
  );
}

function ExperienceEntry({ entry }) {
  const { organization, role, summary, skills } = entry;

  return (
    <article className="entry experience-entry rounded-sm px-4 py-6 first:pt-4 last:pb-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <Heading as="h3" variant="entry">
          {organization}
        </Heading>
        <Text size="small" className="shrink-0">
          {role}
        </Text>
      </div>
      <Text className="mt-3 max-w-2xl">{summary}</Text>
      <SkillList skills={skills} variant="text" />
    </article>
  );
}
