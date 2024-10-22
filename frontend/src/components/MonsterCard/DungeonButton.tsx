import { GiDungeonGate } from 'react-icons/gi';

interface DungeonButtonprops {
  onAddToDungeonClick: () => void;
  isInDungeon: boolean;
}

const DungeonButton = ({ onAddToDungeonClick, isInDungeon }: DungeonButtonprops) => {
  return (
    <button
      className={`bg-none cursor-pointer border-none p-0 rounded-se-3xl rounded-ss-3xl transition-all duration-300 group shadow-[rgba(255,_255,_255,_0.6)_0px_30px_90px] hover:shadow-[rgba(255,_255,_255,_0.8)_0px_40px_100px] hover:scale-105 active:scale-50 ${
        isInDungeon ? 'bg-customRed' : 'hover:bg-white'
      }`}
      onClick={onAddToDungeonClick}
      aria-label={isInDungeon ? 'Remove from dungeon' : 'Add to dungeon'}
    >
      <GiDungeonGate
        size={40}
        className={`transition-all duration-300 group-hover:scale-110 ${
          isInDungeon ? 'text-black' : 'text-white group-hover:text-black'
        }`}
      />
    </button>
  );
};

export default DungeonButton;
