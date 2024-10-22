import { createContext, useState, useEffect, ReactNode } from 'react';
import { MonsterCardDataProps } from '../hooks/useMonster';


interface DungeonContextType {
  dungeonMonsters: MonsterCardDataProps[];
  toggleDungeon: (monster: MonsterCardDataProps) => void;
  isInDungeon: (monsterIndex: string) => boolean;
}

export const DungeonContext = createContext<DungeonContextType>({
  dungeonMonsters: [],
  toggleDungeon: () => {},
  isInDungeon: () => false,
});

export const DungeonProvider = ({ children }: { children: ReactNode }) => {
  const initializeDungeon = () => {
    const savedDungeon = localStorage.getItem('dungeonMonsters');
    return savedDungeon ? JSON.parse(savedDungeon) : [];
  };

  const [dungeonMonsters, setDungeonMonsters] = useState<MonsterCardDataProps[]>(initializeDungeon);

  useEffect(() => {
    localStorage.setItem('dungeonMonsters', JSON.stringify(dungeonMonsters));
  }, [dungeonMonsters]);

  const toggleDungeon = (monster: MonsterCardDataProps) => {
    setDungeonMonsters((prev) => {
      const isAlreadyInDungeon = prev.some((m) => m.index === monster.index);

      if (isAlreadyInDungeon) {
        return prev.filter((m) => m.index !== monster.index);
      } else if (prev.length < 6) {
        return [...prev, monster];
      }
      return prev;
    });
  };

  const isInDungeon = (monsterIndex: string) => {
    return dungeonMonsters.some((monster) => monster.index === monsterIndex);
  };

  return (
    <DungeonContext.Provider value={{ dungeonMonsters, toggleDungeon, isInDungeon }}>
      {children}
    </DungeonContext.Provider>
  );
};
