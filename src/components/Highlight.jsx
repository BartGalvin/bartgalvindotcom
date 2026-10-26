import Heading from "./ui/Heading.jsx";
import Text from "./ui/Text.jsx";
import SectionLabel from "./ui/SectionLabel.jsx";
import SectionFrame from "./ui/SectionFrame.jsx";
import SkillList from "./ui/SkillList.jsx";

export default function Highlight({ id, content }) {
  return (
    <SectionFrame
      className="relative gap-5 border-y py-9 before:absolute before:-top-px before:left-0 before:h-px before:w-16 before:bg-accent before:content-[''] md:py-12"
      id={id}
      label={<SectionLabel>{content.label}</SectionLabel>}
    >
      <Heading
        variant="feature"
        className="max-w-2xl"
        id={`${id}-heading`}
      >
        {content.headline}
      </Heading>
      <Text className="mt-5 max-w-2xl">
        {content.summary}
      </Text>
      <SkillList skills={content.skills} variant="text" />
    </SectionFrame>
  );
}
