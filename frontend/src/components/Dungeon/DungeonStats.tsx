import { MonsterCardDataProps } from '../../hooks/useMonster';


type Stats = {
  monsters: MonsterCardDataProps[];
};

const DungeonStats = ({ monsters }: Stats) => {
  const totalHp = monsters.reduce((sum, monster) => sum + monster.hp, 0);

  const alignmentCounts = monsters.reduce(
    (counts, monster) => {
      const alignment = monster.alignment || 'unknown';
      counts[alignment] = (counts[alignment] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>,
  );

  return (
    <aside className="flex gap-20 justify-between">
      <h2 className="text-2xl">{`Total HP: ${totalHp}`}</h2>
      {/*
      <div className="flex flex-col">
        <h3 className="text-xl">Aligment distribution:</h3>
        <ul className="list-disc ml-6">
          {Object.entries(alignmentCounts).map(([alignment, count]) => (
            <li key={alignment}>
              {alignment}: {count}
            </li>
          ))}
        </ul>
      </div>*/}
    </aside>
  );
};

export default DungeonStats;
