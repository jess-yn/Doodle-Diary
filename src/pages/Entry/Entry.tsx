import { Canvas } from "../../components/Canvas/Canvas";
import { SectionCard } from "../../layout/SectionCard/SectionCard";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { ButtonIcon } from "../../components/Button/ButtonIcon";
import { Button } from "../../components/Button/Button";
import "./Entry.css";

const MOODS = {
  happy: <PencilIcon />,
  relaxed: <PencilIcon />,
  celebratory: <PencilIcon />,
  sad: <PencilIcon />,
  lonely: <PencilIcon />,
  frustrated: <PencilIcon />,
  anxious: <PencilIcon />,
  angry: <PencilIcon />,
  empty: <PencilIcon />,
};

export function Entry() {
  const now: Date = new Date();
  const dateText = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  return (
    <>
      <p className="overline">{dateText}</p>
      <h1 className="h2">Journal Entry</h1>
      <div className="entry-status">
        <div>
          <p>Day 1 of your streak</p>
          <span>Editing</span>
        </div>
        <div>
          <span>autosaved as draft</span>
          <Button variant="secondary" size="md">
            Share
          </Button>
          <Button variant="primary" size="md">
            Save entry
          </Button>
        </div>
      </div>

      <div className="entry">
        <Canvas></Canvas>
        <div className="entry-prompts">
          <SectionCard
            heading="How was today?"
            subheading="pick a mood which best describes you today"
          >
            <div className="moods">
              <ButtonIcon
                icon={<PencilIcon />}
                tooltip="happy"
                variant="lg"
                onClick={() => console.log("click")}
              ></ButtonIcon>
              <ButtonIcon
                icon={<PencilIcon />}
                tooltip="happy"
                variant="lg"
                onClick={() => console.log("click")}
              ></ButtonIcon>
              <ButtonIcon
                icon={<PencilIcon />}
                tooltip="happy"
                variant="lg"
                onClick={() => console.log("click")}
              ></ButtonIcon>

              {Object.entries(MOODS).map(([key, value]) => (
                <ButtonIcon
                  key={key}
                  icon={value}
                  tooltip={key}
                  variant="lg"
                  onClick={() => console.log("click")}
                ></ButtonIcon>
              ))}
            </div>
          </SectionCard>
          <SectionCard
            heading="How was today?"
            subheading="what stuck with you today? "
          ></SectionCard>
          <SectionCard
            heading="A line worth keeping"
            subheading="a motto, a lyric, a snippet overheard"
          ></SectionCard>
        </div>
      </div>
    </>
  );
}
