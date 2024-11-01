import ClassCard from '../../components/SubPages/ClassCard.tsx';
import SubPageLayout from '../../components/Layouts/SubPageLayout.tsx';
import useClass from '../../hooks/useClasses.ts';
import { useQuery } from '@apollo/client';
import { GET_USER_CLASS } from '../../../../backend/src/graphql/queries.ts';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function ClassPage() {
  const { loading, error, classes } = useClass(1, 12);
  const { userId } = useContext(AuthContext);
  const { data: userData } = useQuery(GET_USER_CLASS, {
    variables: { userId },
    skip: !userId,
  });
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  useEffect(() => {
    if (userData?.user?.class?.id) {
      setSelectedClassId(userData.user.class.id);
    }
  }, [userData]);

  const handleClassSelect = (classId: string) => {
    setSelectedClassId(classId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes.</div>;

  return (
    <SubPageLayout>
      <section className="flex flex-col items-center w-full gap-10">
        {classes.map((classInfo) => (
          <ClassCard
            key={classInfo.index}
            id={classInfo.id}
            name={classInfo.name}
            hit_die={classInfo.hit_die}
            index={classInfo.index}
            skills={classInfo.skills}
            selectedClassId={selectedClassId}
            onSelect={handleClassSelect}
          />
        ))}
      </section>
    </SubPageLayout>
  );
}
