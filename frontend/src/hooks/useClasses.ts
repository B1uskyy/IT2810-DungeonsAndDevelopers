import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLASSES } from '../../../backend/src/graphql/queries.ts';
import ClassData from '../interfaces/ClassProps.ts';

function useClass(currentPage: number, classesPerPage: number) {
  const offset = (currentPage - 1) * classesPerPage;

  const { data, error, loading } = useQuery<{
    classes: { classes: ClassData[]; totalClasses: number };
  }>(GET_CLASSES, {
    variables: { offset, limit: classesPerPage },
    fetchPolicy: 'network-only',
  });


  console.log('Data from server: ', data);
  //console.log(data);

  const transformedClasses = useMemo(() => {
    if (!data || !data.classes) return [];
    return data.classes.classes.map((classs) => ({
      id: classs.id,
      index: classs.index,
      name: classs.name,
      hit_die: classs.hit_die,
      skills: classs.skills,
    }));
  }, [data]);

  return {
    classes: transformedClasses,
    totalClasses: data?.classes.totalClasses || 0,
    loading,
    error,
  };
}

export default useClass;
