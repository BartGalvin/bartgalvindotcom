import Section from "./Section.jsx";
import Heading from "./ui/Heading.jsx";
import Text from "./ui/Text.jsx";

export default function Education({ content }) {
  const { title, entries } = content;

  return (
    <Section id="education" title={title}>
      <ul className="entry-list -m-4 grid gap-7 lg:grid-cols-3 lg:gap-6">
        {entries.map((entry) => (
          <EducationEntry key={entry.institution} entry={entry} />
        ))}
      </ul>
    </Section>
  );
}

function EducationEntry({ entry }) {
  const { institution, qualification, school } = entry;

  return (
    <li
      className="entry education-entry rounded-sm p-4"
      data-school={school}
    >
      <Heading as="h3" variant="entry">
        {institution}
      </Heading>
      <Text className="mt-2">{qualification}</Text>
    </li>
  );
}
