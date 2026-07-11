import UnderConstruction from "../components/UnderConstruction";

export default function Blog() {
  return (
    <UnderConstruction
      page="Blog"
      description="Thoughts on technology, design, and building things on the internet. The first post drops at launch."
      icon={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 6h22M5 12h14M5 18h18M5 24h10" />
        </svg>
      }
      eta="Apr 2027"
      tags={["writing", "tech", "design", "internet"]}
    />
  );
}
