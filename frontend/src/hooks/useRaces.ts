import { useEffect, useState } from 'react';

function useRace(race: string) {
  const [data, setData] = useState<{
    name: string;
    alignment: string;
    abilityBonuses: string[];
    index: string;
  }>({
    name: '',
    alignment: '',
    abilityBonuses: [],
    index: '',
  });

  useEffect(() => {
    let isMounted = true;  // To avoid setting state on unmounted component

    // Fetch data only if the race changes
    if (race) {
      fetch('https://www.dnd5eapi.co/api/races/' + race)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) {
            setData(json);
          }
        })
        .catch((error) => console.log(error));
    }

    return () => {
      isMounted = false;  // Cleanup function
    };
  }, [race]);

  return {
    name: data.name,
    alignment: data.alignment,
    abilityBonuses: data.abilityBonuses,
    index: data.index,
  };
}

export default useRace;