import { HeroBanner } from "../../components/HeroBanner/HeroBanner";
import { Section } from "../../layout/PageLayout/Section/Section";
import { Card } from "../../components/Card/Card";
import type { CardProps } from "../../components/Card/Card";
import { List } from "../../components/List/List";
import type { ListItem } from "../../components/List/List";
import { CtaBanner } from "../../components/CTABanner/CtaBanner";
import { LogoIcon } from "../../components/icons/LogoIcon";
import "./Home.css";

const primaryCta = {
  text: `Let's doodle`,
  href: "/",
};

const SecondaryCTA = {
  text: `See an example`,
  href: "/",
};

const stepCards: CardProps[] = [
  {
    step: "01",
    icon: <LogoIcon />,
    title: "Pick a mood",
    description:
      "Nine soft choices — happy, lonely, frustrated, empty, all of them. A starting point, not a label.",
  },
  {
    step: "02",
    icon: <LogoIcon />,
    title: "Note the moment",
    description:
      "A line about what stuck. A quote you'd like to keep. Tiny anchors so the drawing remembers.",
  },
  {
    step: "03",
    icon: <LogoIcon />,
    title: "Doodle the day",
    description:
      "Four pens, your colors, a clean sheet. No layers, no pressure — just you and the line that finds the day.",
  },
];

const listItems: ListItem[] = [
  {
    title: "A canvas built for hands, not pros",
    description:
      "Pencil, fineliner, marker, tapered pen — with stabilization built in so the line you draw is the one you meant.",
  },
  {
    title: "Streaks that gently nudge, not nag",
    description:
      "A daily reminder at a time you choose. Miss a day? The shape of your year still holds.",
  },
  {
    title: "A year you can flip through",
    description:
      "Months, weeks, days — see at a glance which kind of week it was. Notice patterns. Find yourself.",
  },
];

export function Home() {
  return (
    <>
      <HeroBanner
        overline="a journal for people who'd rather draw"
        title={
          <>
            Draw the <br />
            <span className="accent">shape</span> of your day
          </>
        }
        description="Doodle Diary is a soft place for the days that words don't quite reach. Pick a mood, jot a moment, sketch the rest. Build a year you can flip through."
        primaryCta={primaryCta}
        secondaryCta={SecondaryCTA}
      ></HeroBanner>
      <Section
        overline="a small ritual"
        sectionheading={
          <>
            Three things, <span className="accent">once a day.</span>
          </>
        }
      >
        <div className="card-row">
          {stepCards.map((card) => (
            <Card key={card.step} {...card} />
          ))}
        </div>
      </Section>

      <Section
        overline="for the rest of us"
        sectionheading={
          <>
            Journaling, <span className="accent">without the words.</span>
          </>
        }
      >
        <div className="two-column">
          <div className="left">
            <List items={listItems}></List>
          </div>
          <div className="right">
            <div className="tile-gallery">
              <div className="tile"></div>
              <div className="tile"></div>
              <div className="tile"></div>
              <div className="tile"></div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <CtaBanner btnText="Let's doodle" href="/">
          <>
            Today is a <span className="accent">blank page</span>.<br />
            What does it look like?
          </>
        </CtaBanner>
      </Section>
    </>
  );
}
