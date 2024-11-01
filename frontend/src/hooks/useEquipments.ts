import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Equipment } from '../interfaces/EquipmentProps';

const GET_EQUIPMENTS = gql`
  query GetEquipments($offset: Int, $limit: Int) {
    equipments(offset: $offset, limit: $limit) {
      equipments {
        id
        index
        name
        category
        value
      }
      totalCount
    }
  }
`;

function useEquipments(currentPage: number, equipmentsPerPage: number) {
  const offset = (currentPage - 1) * equipmentsPerPage;

  const { data, error, loading } = useQuery<{
    equipments: { equipments: Equipment[]; totalCount: number };
  }>(GET_EQUIPMENTS, {
    variables: { offset, limit: equipmentsPerPage },
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.error('GraphQL Error:', err);
    },
  });
  console.log('Data from server', data);

  const transformedEquipments = useMemo(() => {
    if (!data || !data.equipments) return [];
    return data.equipments.equipments.map((equipment) => ({
      id: equipment.id,
      index: equipment.index,
      name: equipment.name,
      category: equipment.category,
      value: equipment.value,
    }));
  }, [data]);

  return {
    equipments: transformedEquipments,
    totalEquipments: data?.equipments.totalCount || 0,
    loading,
    error,
  };
}

export default useEquipments;
