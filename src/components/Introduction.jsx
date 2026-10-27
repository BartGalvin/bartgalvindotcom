import portrait from "../../assets/img/profile.jpg";
import Heading from "./ui/Heading.jsx";
import Text from "./ui/Text.jsx";
import Link from "./ui/Link.jsx";

export default function Introduction({ profile, contactButtonLabel }) {
  return (
    <section
      className="grid items-center gap-y-6 py-9 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-16 md:py-16 lg:py-20"
      aria-labelledby="introduction-heading"
    >
      <div className="w-52 max-w-full justify-self-center sm:w-60 md:col-start-2 md:row-start-1 lg:w-72">
        <img
          className="aspect-square w-full object-cover md:aspect-[4/5]"
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          width="1881"
          height="1881"
        />
      </div>
      <div className="min-w-0 md:col-start-1 md:row-start-1">
        <Heading
          as="h1"
          variant="hero"
          className="max-w-xl"
          id="introduction-heading"
        >
          {profile.title}
        </Heading>
        <Text className="mt-6 max-w-xl">
          {profile.introduction}
        </Text>
        <div className="mt-8 flex flex-wrap items-center text-base font-medium">
          <Link variant="button" arrow="right" href={`mailto:${profile.email}`}>
            {contactButtonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
