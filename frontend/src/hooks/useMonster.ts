import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import MonsterDataProps from '../interfaces/MonsterDataProps.ts';

const GET_MONSTERS = gql`
    query GetMonsters($searchTerm: String, $offset: Int, $limit: Int) {
        monsters(searchTerm: $searchTerm, offset: $offset, limit: $limit) {
            monsters {
                id
                name
                size
                type
                alignment
                hit_points
                image
            }
            totalMonsters
        }
    }
`;

function useMonster(searchTerm: string, currentPage: number, monstersPerPage: number) {
  const offset = (currentPage - 1) * monstersPerPage;

  const { data, error, loading } = useQuery<{
    monsters: { monsters: MonsterDataProps[], totalMonsters: number }
  }>(GET_MONSTERS, {
    variables: { searchTerm, offset, limit: monstersPerPage },
    fetchPolicy: 'network-only',  // Alltid hente ferske data fra serveren
  });

  const transformedMonsters = useMemo(() => {
    if (!data || !data.monsters) return [];
    const mappedMonsters = data.monsters.monsters.map(monster => ({
      id: monster.id,
      name: monster.name,
      type: monster.type,
      hp: monster.hit_points,
      alignment: monster.alignment,
      size: monster.size,
      img: monster.image,
    }));

    return Array.from(new Map(mappedMonsters.map((m) => [m.id, m])).values());
  }, [data]);

  return {
    monsters: transformedMonsters,
    totalMonsters: data?.monsters.totalMonsters || 0,
    loading,
    error,
  };
}

export default useMonster;