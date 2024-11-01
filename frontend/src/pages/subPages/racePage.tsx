import RaceCard from '../../components/SubPages/RaceCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';
import useRace from '../../hooks/useRaces.ts';
import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { GET_USER_RACE } from '../../../../backend/src/graphql/queries.ts';
import { AuthContext } from '../../context/AuthContext';

export default function RacePage() {
  const { loading, error, races } = useRace(1, 9);
  const { userId } = useContext(AuthContext);
  const { data: userData } = useQuery(GET_USER_RACE, {
    variables: { userId },
    skip: !userId,
  });
  const [selectedRaceId, setSelectedRaceId] = useState<string>('');

  useEffect(() => {
    if (userData?.user?.race?.id) {
      setSelectedRaceId(userData.user.race.id);
    }
  }, [userData]);

  const handleRaceSelect = (raceId: string) => {
    setSelectedRaceId(raceId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading races.</div>;

  return (
    <SubPageLayout>
      <section className="flex flex-col items-center w-full gap-10">
        {races.map((race) => (
          <RaceCard
            key={race.index}
            index={race.index}
            id={race.id}
            name={race.name}
            alignment={race.alignment}
            size={race.size}
            speed={race.speed}
            selectedRaceId={selectedRaceId}
            onSelect={handleRaceSelect}
          />
        ))}
      </section>
    </SubPageLayout>
  );
}
