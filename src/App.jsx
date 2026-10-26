import {
  business,
  education,
  experience,
  pageCopy,
  profile,
} from "./content.js";
import Header from "./components/Header.jsx";
import Introduction from "./components/Introduction.jsx";
import Highlight from "./components/Highlight.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10" id="top">
      <Header name={profile.name} />
      <main id="main-content" tabIndex={-1}>
        <Introduction
          profile={profile}
          contactButtonLabel={pageCopy.contactButtonLabel}
        />
        <Highlight id="entrepreneurship" content={business} />
        <Experience content={experience} />
        <Education content={education} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
