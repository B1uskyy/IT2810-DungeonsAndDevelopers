import { useContext, useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput.tsx';
import DungeonMonsterGrid from '../../components/Dungeon/DungeonMonsterGrid.tsx';
import DungeonStats from '../../components/Dungeon/DungeonStats.tsx';
import { DungeonContext } from '../../context/DungeonContext.tsx';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';

export default function DungeonPage() {
  const [dungeonName, setDungeonName] = useState(() => {
    const savedName = localStorage.getItem('dungeonName');
    return savedName || 'Enter dungeon name';
  });

  const { dungeonMonsters } = useContext(DungeonContext);

  const handleSaveDungeonName = (newName: string) => {
    setDungeonName(newName);
    localStorage.setItem('dungeonName', newName);
  };

  return (
    <MainPageLayout>
      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full z-0 before:absolute before:inset-0 before:bg-dungeon before:bg-cover before:bg-center before:z-0">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70" />
        <div
          className="flex flex-col py-20 text-white min-h-[calc(100vh-100px)] min-w-[70%] z-10 mt-20 justify-between items-center">
          <CustomInput
            placeholder="Enter dungeon name"
            inputName="Dungeon Name"
            value={dungeonName}
            onSave={handleSaveDungeonName}
          />
          <DungeonStats monsters={dungeonMonsters} />

          <DungeonMonsterGrid />
        </div>
      </main>
    </MainPageLayout>
  );
}
