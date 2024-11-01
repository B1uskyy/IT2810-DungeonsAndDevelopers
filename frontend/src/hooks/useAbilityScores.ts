import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import AbilityScoreCardProps from '../interfaces/AbilityScoreProps.ts';
import { GET_ABILITYSCORES } from '../../../backend/src/graphql/queries.ts';

function useAbilityScores(currentPage: number, abilitiesPerPage: number) {
  const offset = (currentPage - 1) * abilitiesPerPage;

  const { data, error, loading } = useQuery<{
    abilities: { abilities: AbilityScoreCardProps[]; totalAbilities: number };
  }>(GET_ABILITYSCORES, {
    variables: { offset, limit: abilitiesPerPage },
    fetchPolicy: 'network-only',
  });
  console.log('GraphQL Response:', data);

  const transformedAbilities = useMemo(() => {
    if (!data || !data.abilities) return [];
    return data.abilities.abilities.map((ability) => ({
      index: ability.index,
      name: ability.name,
      skills: ability.skills,
    }));
  }, [data]);

  return {
    abilities: transformedAbilities,
    totalAbilities: data?.abilities.totalAbilities || 0,
    loading,
    error,
  };
}

export default useAbilityScores;
