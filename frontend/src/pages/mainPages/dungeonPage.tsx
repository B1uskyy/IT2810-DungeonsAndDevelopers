import { useContext, useEffect, useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput.tsx';
import DungeonMonsterGrid from '../../components/Dungeon/DungeonMonsterGrid.tsx';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import { GET_USER_DUNGEON, UPDATE_DUNGEON_NAME } from '../../../../backend/src/graphql/queries.ts';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../context/AuthContext.tsx';
import DungeonStats from '../../components/Dungeon/DungeonStats.tsx';

export default function DungeonPage() {
  const { userId } = useContext(AuthContext);

  const { data } = useQuery(GET_USER_DUNGEON, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  const [updateDungeonName] = useMutation(UPDATE_DUNGEON_NAME, {
    refetchQueries: [{ query: GET_USER_DUNGEON, variables: { userId } }],
    awaitRefetchQueries: true,
  });

  const [dungeonName, setDungeonName] = useState<string>('My Dungeon');

  useEffect(() => {
    if (data && data.user && data.user.dungeonName) {
      setDungeonName(data.user.dungeonName);
    }
  }, [data]);

  const handleSaveDungeonName = (newName: string) => {
    setDungeonName(newName);

    if (userId) {
      updateDungeonName({
        variables: { userId, dungeonName: newName },
      })
        .then((response) => {
          console.log('Dungeon name updated successfully:', response);
        })
        .catch((error) => {
          console.error('Error updating dungeon name:', error);
        });
    }
  };

  return (
    <MainPageLayout>
      <main className="main before:bg-dungeon xl:h-screen xl:overflow-hidden">
        <div className="black-overlay" />
        <div className="wrapper min-w-[70%] mt-[10vh] h-full !justify-start">
          <CustomInput
            placeholder="Enter dungeon name"
            inputName="Dungeon Name"
            value={dungeonName}
            onSave={handleSaveDungeonName}
          />
          <DungeonStats />
          <DungeonMonsterGrid />
        </div>
      </main>
    </MainPageLayout>
  );
}
