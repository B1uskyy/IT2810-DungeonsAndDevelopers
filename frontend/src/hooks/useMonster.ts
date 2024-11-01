import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import MonsterDataProps from '../interfaces/MonsterDataProps.ts';
import { GET_MONSTERS } from '../../../backend/src/graphql/queries.ts';

function useMonster(searchTerm: string, currentPage: number, monstersPerPage: number, selectedFilters: Set<string>) {
  const offset = (currentPage - 1) * monstersPerPage;

  const { data, error, loading } = useQuery<{
    monsters: { monsters: MonsterDataProps[]; totalMonsters: number };
  }>(GET_MONSTERS, {
    variables: { searchTerm, offset, limit: monstersPerPage, types: Array.from(selectedFilters) },
    fetchPolicy: 'network-only',
  });

  const transformedMonsters = useMemo(() => {
    if (!data || !data.monsters) return [];
    const filteredMonsters = data.monsters.monsters.filter(
      (monster) => selectedFilters.size === 0 || selectedFilters.has(monster.type)
    );

    return filteredMonsters.map((monster) => ({
      id: monster.id,
      name: monster.name,
      type: monster.type,
      hp: monster.hit_points,
      alignment: monster.alignment,
      size: monster.size,
      img: monster.image,
    }));
  }, [data, selectedFilters]);

  return {
    monsters: transformedMonsters,
    totalMonsters: data?.monsters.totalMonsters || 0,
    loading,
    error,
  };
}

export default useMonster;
