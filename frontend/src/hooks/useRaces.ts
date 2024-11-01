import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import RaceProps from '../interfaces/RaceProps.ts';
import { GET_RACES } from '../../../backend/src/graphql/queries.ts';

function useRaces(currentPage: number, racesPerPage: number) {
  const offset = (currentPage - 1) * racesPerPage;

  const { data, error, loading } = useQuery<{
    races: { races: RaceProps[]; totalRaces: number };
  }>(GET_RACES, {
    variables: { offset, limit: racesPerPage },
    fetchPolicy: 'network-only',
  });

  if (error) {
    console.error('GraphQL Error:', error);
  }
  console.log('Data from server: ', data);

  const transformedRaces = useMemo(() => {
    if (!data || !data.races) return [];
    return data.races.races.map((race) => ({
      id: race.id,
      index: race.index,
      name: race.name,
      speed: race.speed,
      alignment: race.alignment,
      size: race.size,
    }));
  }, [data]);

  return {
    races: transformedRaces,
    totalRaces: data?.races.totalRaces || 0,
    loading,
    error,
  };
}

export default useRaces;
