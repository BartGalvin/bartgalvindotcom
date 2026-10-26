import Heading from "./ui/Heading.jsx";
import SectionFrame from "./ui/SectionFrame.jsx";

export default function Section({ id, title, children }) {
  return (
    <SectionFrame
      id={id}
      className="gap-6 border-b py-10 sm:py-12"
      label={
        <Heading className="md:max-w-52" id={`${id}-heading`}>
          {title}
        </Heading>
      }
    >
      {children}
    </SectionFrame>
  );
}
