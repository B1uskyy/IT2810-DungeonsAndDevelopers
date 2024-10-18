import { useContext, useEffect, useState } from 'react';
import NoMonsterImageFound from '../../assets/images/no_monster_image_found.jpg';
import { DungeonContext } from '../../context/DungeonContext.tsx';
import { MonsterCardDataProps } from '../../hooks/useMonster.ts';
import DungeonButton from './DungeonButton.tsx';
import MonsterReviewModal from './MonsterReviewModal.tsx';

export interface MonsterCardProps extends MonsterCardDataProps {
  onLoad: () => void;
}

const MonsterCard = ({ index, name, type, hp, alignment, size, img, onLoad }: MonsterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { toggleDungeon, isInDungeon } = useContext(DungeonContext);

  useEffect(() => {
    if (index && !img) {
      setImageLoaded(true);
      onLoad();
    }
  }, [img, index]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
    onLoad();
  };

  const monsterImageURL = img ? img : NoMonsterImageFound;

  const handleToggleDungeon = () => {
    toggleDungeon({ index, name, type, hp, alignment, size, img });
  };

  return (
    <div
      className="flex flex-col items-center justify-between bg-black shadow-black shadow-2xl pb-5 w-72 h-[340px] rounded-lg overflow-hidden"
    >
      <div className="relative w-full h-52 overflow-hidden">
        {!imageLoaded && <div>Loading image...</div>}
        {imageError ? (
          <img
            src={NoMonsterImageFound}
            alt="No monster image found"
            className="max-w-[15vw] rounded-[15px] shadow-[0_2px_2px_0_rgba(0,0,0,1) top-0 pt-0 mt-0]"
          />
        ) : (
          <div className="relative flex justify-center w-full h-full">
            <img
              src={monsterImageURL}
              alt={img ? 'Image of the monster' : 'No monster image found'}
              className="object-cover h-full w-full object-top"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            <div className="absolute left-[80%] top-5">
              <DungeonButton onAddToDungeonClick={handleToggleDungeon} isInDungeon={isInDungeon(index)} />
            </div>
          </div>
        )}
        {!imageLoaded && <div className="flex justify-center w-full py-24">Loading image...</div>}


      </div>
      <div className="flex flex-col gap-1 w-full p-3">
        <h2 className="text-white text-xl bold">{name}</h2>
        <p className="text-md">Type: {type}</p>
        <p className="text-md">HP: {hp}</p>
        <div className="flex w-full justify-between">
          <MonsterReviewModal name={name} monsterIndex={index} image={monsterImageURL} />
          <button onClick={handleToggleDungeon}
                  className="hover:text-customRed transition-all duration-200">{isInDungeon(index) ? 'Remove from dungeon' : 'Add to dungeon'}</button>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;