import UnderConstruction from "../components/UnderConstruction";

export default function Projects() {
  return (
    <UnderConstruction
      page="Projects"
      description="A showcase of the tools, experiments, and builds launching under this domain. We're assembling the portfolio now."
      icon={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="11" height="11" rx="2" />
          <rect x="18" y="3" width="11" height="11" rx="2" />
          <rect x="3" y="18" width="11" height="11" rx="2" />
          <rect x="18" y="18" width="11" height="11" rx="2" />
        </svg>
      }
      eta="Q2 2027"
      tags={["open source", "tools", "experiments", "builds"]}
    />
  );
}
