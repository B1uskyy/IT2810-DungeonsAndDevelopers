import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_EQUIPMENT_TO_CHARACTER,
  GET_USER_EQUIPMENT,
  REMOVE_EQUIPMENT_FROM_CHARACTER,
} from '../../../backend/src/graphql/queries.ts';
import { Equipment } from '../interfaces/EquipmentProps.ts';

const useUserEquipments = () => {
  const { userId } = useContext(AuthContext);
  const [userEquipments, setUserEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const { data, refetch } = useQuery(GET_USER_EQUIPMENT, {
    variables: { userId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.user) {
      setUserEquipments(data.user.equipments || []);
      setLoading(false);
    }
  }, [data]);

  const [addEquipment] = useMutation(ADD_EQUIPMENT_TO_CHARACTER, {
    onCompleted: refetch,
  });

  const [removeEquipment] = useMutation(REMOVE_EQUIPMENT_FROM_CHARACTER, {
    onCompleted: refetch,
  });

  const addToEquipments = async (equipId: string) => {
    await addEquipment({ variables: { userId, equipmentId: equipId } });
  };

  const removeFromEquipments = async (equipId: string) => {
    await removeEquipment({ variables: { userId, equipmentId: equipId } });
  };
  return { userEquipments, loading, refetchEquipments: refetch, addToEquipments, removeFromEquipments };
};

export default useUserEquipments;
