import { Section } from "../../layout/Section/Section";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Section>
        <div className="calendar">
          {[...Array(30)].map((_, index) => (
            <div key={index} className="tile"></div>
          ))}
        </div>
      </Section>
    </>
  );
}
