import { useEffect, useState } from 'react';

// Define the structure for a skill
interface Skill {
  name: string;
  index: string;
  url: string;
}

// Define the structure for the ability score data
interface AbilityScoreData {
  name: string;
  full_name: string;
  desc: string;
  skills: Skill[];
}

function useAbilityScores(abilityScoreName: string) {
  const [data, setData] = useState<AbilityScoreData>({
    name: '',
    full_name: '',
    desc: '',
    skills: [],
  });

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/ability-scores/' + abilityScoreName)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, [abilityScoreName]);

  return data;
}

export default useAbilityScores;