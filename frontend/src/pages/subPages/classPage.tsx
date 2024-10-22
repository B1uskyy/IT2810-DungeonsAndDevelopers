import useClasses from '../../hooks/useClasses.ts';
import ClassCard from '../../components/SubPages/ClassCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';

export default function ClassPage() {
  const classes = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];
  const classData = classes.map(useClasses);

  return (
    <SubPageLayout>
      <section className="flex flex-col items-center w-full gap-10">
        {classData.map((classInfo, index) => (
          <ClassCard
            key={index}
            name={classInfo.name}
            hit_die={classInfo.hit_die}
            index={classInfo.index}
            skills={classInfo.skills}
          />
        ))}
      </section>
    </SubPageLayout>
  );
}