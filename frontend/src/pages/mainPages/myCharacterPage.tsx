import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import raceImageMapping from '../../utils/raceImageMapping.ts';
import classImageMapping from '../../utils/classImageMapping.ts';
import useRaces from '../../hooks/useRaces.ts';
import useClasses from '../../hooks/useClasses.ts';
import useAbilityScores from '../../hooks/useAbilityScores.ts';
import Counter from '../../components/Counter/Counter.tsx';

const MyCharacterPage = () => {
  const raceNames = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling'];
  const classNames = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

  const raceData = raceNames.map(useRaces);
  const classData = classNames.map(useClasses);

  const [raceIndex, setRaceIndex] = useState(0);
  const [classIndex, setClassIndex] = useState(0);

  const [raceImageLoaded, setRaceImageLoaded] = useState(false);
  const [classImageLoaded, setClassImageLoaded] = useState(false);

  const handleNextRace = () => setRaceIndex((prevIndex) => (prevIndex + 1) % raceData.length);
  const handlePrevRace = () => setRaceIndex((prevIndex) => (prevIndex - 1 + raceData.length) % raceData.length);

  const handleNextClass = () => setClassIndex((prevIndex) => (prevIndex + 1) % classData.length);
  const handlePrevClass = () => setClassIndex((prevIndex) => (prevIndex - 1 + classData.length) % classData.length);

  const currentRace = raceData[raceIndex];
  const currentClass = classData[classIndex];

  const currentRaceImage = currentRace ? raceImageMapping[currentRace.index] : '';
  const currentClassImage = currentClass ? classImageMapping[currentClass.index] : '';

  // Ability Score Logic
  const abilities = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
  const abilityData = abilities.map(useAbilityScores);
  const [abilityValue, setAbilityValue] = useState([0, 0, 0, 0, 0, 0]);

  const handleAbilityChange = (index: number, newValue: number) => {
    const updatedAbilities = [...abilityValue];
    updatedAbilities[index] = newValue;
    setAbilityValue(updatedAbilities);
  };

  return (
    <MainPageLayout>
      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full z-0 before:absolute before:inset-0 before:bg-myCharacter before:bg-cover before:bg-center before:z-0">

        <div className="absolute inset-0 w-full h-full bg-black opacity-70" />
        <div
          className="flex flex-col py-20 text-white min-h-[calc(100vh-100px)] min-w-[70%] z-10 mt-24 justify-between items-center">
          <h2 className="text-4xl">My Character</h2>
          {/* RACE SECTION */}
          <section className="w-full flex justify-between">
            <article className="w-full xl:w-1/2 flex flex-col items-center">
              <h2 className="text-3xl mb-8">Race:</h2>
              <div className="flex items-center justify-between gap-4">
                <button className="text-4xl text-white hover:text-gray-400" onClick={handlePrevRace}>
                  <FaChevronLeft />
                </button>
                {currentRace && (
                  <article className="flex flex-col justify-center items-center gap-4 min-w-52">
                    <h2 className="text-2xl">{currentRace.name}</h2>
                    <div className="flex justify-center items-center w-52 h-52 overflow-hidden">
                      {!raceImageLoaded && (
                        <div className="flex justify-center w-full">Loading image...</div>
                      )}
                      <img
                        src={currentRaceImage}
                        alt={currentRace.name}
                        className="w-full h-full object-contain shadow-none"
                        onLoad={() => setRaceImageLoaded(true)}
                        style={{ display: raceImageLoaded ? 'block' : 'none' }}
                      />
                    </div>
                  </article>
                )}
                <button className="text-4xl text-white hover:text-gray-400" onClick={handleNextRace}>
                  <FaChevronRight />
                </button>
              </div>
            </article>

            {/* Class section */}
            <article className="w-full xl:w-1/2 flex flex-col items-center">
              <h2 className="text-3xl mb-8">Class:</h2>
              <div className="flex items-center gap-4">
                <button className="text-4xl text-white hover:text-gray-400" onClick={handlePrevClass}>
                  <FaChevronLeft />
                </button>
                {currentClass && (
                  <article className="flex flex-col items-center gap-4">
                    <h2 className="text-2xl">{currentClass.name}</h2>
                    <div className="flex justify-center items-center w-52 h-52 overflow-hidden">
                      {!classImageLoaded && (
                        <div className="flex justify-center w-full py-24">Loading image...</div>
                      )}
                      <img
                        src={currentClassImage}
                        alt={currentClass.name}
                        className="w-full h-full object-contain shadow-none"
                        onLoad={() => setClassImageLoaded(true)} // Update the state when image is loaded
                        style={{ display: classImageLoaded ? 'block' : 'none' }} // Show image only when loaded
                      />
                    </div>
                  </article>
                )}
                <button className="text-4xl text-white hover:text-gray-400" onClick={handleNextClass}>
                  <FaChevronRight />
                </button>
              </div>
            </article>
          </section>

          {/* Ability scores section */}
          <section className="w-full flex xl:flex-row justify-between">
            <article className="flex flex-col items-center w-full xl:w-1/2">
              <h2 className="text-3xl mb-8">Ability Scores:</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-40">
                {abilityData.map((ability, index) => (
                  <div key={index} className="flex items-center">
                    <label className="text-lg w-32">{ability.full_name}:</label>
                    <Counter
                      value={abilityValue[index]}
                      onChange={(newValue) => handleAbilityChange(index, newValue)}
                    />
                  </div>
                ))}
              </div>
            </article>

            {/* Equipemnt section */}
            <article className="flex flex-col items-center w-full xl:w-1/2">
              <h2 className="text-3xl mb-8">Equipments:</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-40">
                {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'].map((item, index) => (
                  <li key={index} className="list-disc list-inside text-lg">
                    {item}
                  </li>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
    </MainPageLayout>
  );
};

export default MyCharacterPage;