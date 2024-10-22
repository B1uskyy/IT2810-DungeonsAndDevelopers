import { useEffect, useState } from 'react';

interface ProficiencyOption {
  item: {
    index: string;
    name: string;
    url: string;
  };
}

interface ProficiencyChoice {
  desc: string;
  choose: number;
  type: string;
  from: {
    options: ProficiencyOption[];
  };
}

interface ClassData {
  name: string;
  hit_die: number;
  index: string;
  skills: string[];
}

function useClasses(className: string) {
  const [data, setData] = useState<ClassData>({
    name: '',
    hit_die: 0,
    index: '',
    skills: [],
  });

  useEffect(() => {
    let isMounted = true;  // To avoid setting state on unmounted component

    // Fetch data only if the className changes
    if (className) {
      fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) {
            const proficiencyChoices: ProficiencyChoice | undefined = json.proficiency_choices?.find(
              (choice: ProficiencyChoice) => choice.type === 'proficiencies',
            );

            const skills = proficiencyChoices
              ? proficiencyChoices.from.options.map((option: ProficiencyOption) =>
                option.item.name.replace('Skill: ', ''),
              )
              : [];

            setData({
              name: json.name,
              hit_die: json.hit_die,
              index: json.index,
              skills,
            });
          }
        })
        .catch((error) => console.log(error));
    }

    return () => {
      isMounted = false;  // Cleanup function
    };
  }, [className]);

  return {
    name: data.name,
    hit_die: data.hit_die,
    index: data.index,
    skills: data.skills,
  };
}

export default useClasses;