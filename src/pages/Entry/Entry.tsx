import { Canvas } from "../../components/Canvas/Canvas";
import { SectionCard } from "../../layout/SectionCard/SectionCard";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { ButtonIcon } from "../../components/Button/ButtonIcon";
import { Button } from "../../components/Button/Button";
import "./Entry.css";
import { useState } from "react";

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
  const [activeMood, setActiveMood] = useState<keyof typeof MOODS>();

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
        <div className="entry-details">
          <span>Day 1 of your streak</span>
          <span>Editing</span>
        </div>
        <div className="entry-modify">
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
              {Object.entries(MOODS).map(([key, value]) => (
                <ButtonIcon
                  key={key}
                  icon={value}
                  tooltip={key}
                  variant="lg"
                  active={activeMood == key}
                  onClick={() => setActiveMood(key as keyof typeof MOODS)}
                ></ButtonIcon>
              ))}
            </div>
          </SectionCard>
          <SectionCard
            heading="How was today?"
            subheading="what stuck with you today? "
          >
            <textarea
              name="moment"
              id="moment"
              maxLength={200}
              rows={4}
            ></textarea>
          </SectionCard>
          <SectionCard
            heading="A line worth keeping"
            subheading="a motto, a lyric, a snippet overheard"
          >
            <input name="quote" id="quote" type="text" />
          </SectionCard>
        </div>
      </div>
    </>
  );
}
