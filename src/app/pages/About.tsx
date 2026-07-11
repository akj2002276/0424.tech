import UnderConstruction from "../components/UnderConstruction";

export default function About() {
  return (
    <UnderConstruction
      page="About"
      description="The story behind 0424.tech — who we are, what we stand for, and why we chose this date. Coming soon."
      icon={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="10" r="4" />
          <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" />
        </svg>
      }
      eta="Q1 2027"
      tags={["identity", "mission", "team", "values"]}
    />
  );
}
