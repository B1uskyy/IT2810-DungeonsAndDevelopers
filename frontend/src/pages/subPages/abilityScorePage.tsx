import useAbilityScores from '../../hooks/useAbilityScores.ts';
import AbilityScoreCard from '../../components/SubPages/AbilityScoreCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';

export default function AbilityScorePage() {
  const abilities = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
  const abilityData = abilities.map(useAbilityScores);

  return (
    <SubPageLayout>
      <section className="flex flex-col items-center w-full gap-10">
        {abilityData.map((ability, index) => (
          <AbilityScoreCard
            key={index}
            name={ability.full_name}
            description={ability.desc}
            skills={ability.skills.map((skill) => ({ name: skill.name }))}
          />
        ))}
      </section>
    </SubPageLayout>
  );
}