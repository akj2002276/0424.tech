import UnderConstruction from "../components/UnderConstruction";

export default function Contact() {
  return (
    <UnderConstruction
      page="Contact"
      description="A proper contact page is on the way. In the meantime, the notification list on the home page is the best way to reach us."
      icon={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="26" height="18" rx="2" />
          <path d="M3 9l13 9 13-9" />
        </svg>
      }
      eta="at launch"
      tags={["email", "socials", "collab"]}
    />
  );
}
