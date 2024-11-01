import useAbilityScores from '../../hooks/useAbilityScores.ts';
import AbilityScoreCard from '../../components/SubPages/AbilityScoreCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';


export default function AbilityScorePage() {
  const { loading, error, abilities } = useAbilityScores(1, 6);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading abilities.</div>;


  return (
    <SubPageLayout>
      <section className="flex flex-col items-center w-full gap-10">
        {
          abilities.map((ability) =>
          (
          <AbilityScoreCard
            key={ability.index}
            name={ability.name}
            index={ability.index}
            skills={ability.skills}
          />
        ))}
      </section>
    </SubPageLayout>
  );
}