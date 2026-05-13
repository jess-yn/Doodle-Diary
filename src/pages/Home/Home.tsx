import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { Section } from "../../layout/PageLayout/Section/Section";

const primaryCta = {
  text: `Let's doodle`,
  href: "/",
};

const SecondaryCTA = {
  text: `See an example`,
  href: "/",
};

export function Home() {
  return (
    <>
      <HeroBanner
        overline="a journal for people who'd rather draw"
        title={
          <>
            Draw the <span className="accent">shape</span> of your day
          </>
        }
        description="Doodle Diary is a soft place for the days that words don't quite reach. Pick a mood, jot a moment, sketch the rest. Build a year you can flip through."
        primaryCta={primaryCta}
        secondaryCta={SecondaryCTA}
      ></HeroBanner>
      {/* <Section>
        <div className="section-heading">
          <p className="overline">a small ritual</p>
          <h2>
            Three things, <span>once a day.</span>
          </h2>
        </div>
      </Section> */}
    </>
  );
}
