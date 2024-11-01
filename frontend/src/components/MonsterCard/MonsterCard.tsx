import { useContext, useEffect, useState } from 'react';
import NoMonsterImageFound from '../../assets/images/no_monster_image_found.jpg';
import { DungeonContext } from '../../context/DungeonContext.tsx';
import DungeonButton from './DungeonButton.tsx';
import MonsterReviewModal from './MonsterReviewModal.tsx';
import MonsterDetailsModal from './MonsterDetailsModal.tsx';
import { MonsterCardProps } from '../../interfaces/MonsterCardProps.ts';

const MonsterCard = ({ id, name, type, hp, alignment, size, img }: MonsterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toggleDungeon, isInDungeon } = useContext(DungeonContext);

  useEffect(() => {
    if (id && !img) {
      setImageLoaded(true);
    }
  }, [img, id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const monsterImageURL = img ? img : NoMonsterImageFound;

  const handleToggleDungeon = () => {
    console.log('Toggling dungeon for monster:', { id, name, type, hp, alignment, size, img });
    toggleDungeon({ id, name, type, hp, alignment, size, img });
  };

  // Function to open the modal when the card is clicked
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="flex flex-col items-center justify-between bg-black pb-5 w-[75vw] md:w-[42vw] xl:w-[22vw] 2xl:w-[18vw] h-[40vh] sm:h-[45vh] md:h-[35vh] rounded-lg overflow-hidden
           transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-black cursor-pointer"
      >
        <div className="relative w-full h-[30vh] overflow-hidden">
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
              <div className="absolute left-[75%] top-5">
                <DungeonButton onAddToDungeonClick={handleToggleDungeon} isInDungeon={isInDungeon(id)} />
              </div>
            </div>
          )}
          {!imageLoaded && <div className="flex justify-center w-full py-24">Loading image...</div>}


        </div>
        <div className="flex flex-col gap-1 w-full p-3">
          <h2 className="text-5xl md:text-3xl lg:text-2xl xl:text-xl 2xl:text-lg bold">{name}</h2>
          <p className="text-4xl md:text-2xl xl:text-lg 2xl:text-sm">Type: {type}</p>
          <p className="text-4xl md:text-2xl xl:text-lg 2xl:text-sm">HP: {hp}</p>
          <div className="flex w-full justify-between">
            {/* stopPropagation to prevent showing the details modal when the review button is clicked */}
            <div onClick={(e) => e.stopPropagation()}>
              <MonsterReviewModal monsterId={id} name={name} image={monsterImageURL} />
            </div>
            <button onClick={(e) => {
              e.stopPropagation();
              handleToggleDungeon();
            }}
                    className="text-4xl md:text-2xl xl:text-lg 2xl:text-sm hover:text-customRed transition-all duration-200">{isInDungeon(id) ? 'Remove from dungeon' : 'Add to dungeon'}</button>
          </div>
        </div>
      </div>
      {/* Monster Details Modal */}
      {isModalOpen && (
        <MonsterDetailsModal
          id={id}
          name={name}
          hp={hp}
          type={type}
          image={monsterImageURL}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MonsterCard;