import type { Person } from "@/lib/types";
import PersonCard from "./PersonCard";

interface PersonGridProps {
  people: Person[];
}

export default function PersonGrid({ people }: PersonGridProps) {
  if (people.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
