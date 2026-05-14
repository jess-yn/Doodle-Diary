import { Canvas } from "../../components/Canvas/Canvas";

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

      <div>
        <Canvas></Canvas>
      </div>
    </>
  );
}
