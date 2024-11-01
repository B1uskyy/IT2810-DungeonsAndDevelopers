import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';

import TutorialModal from '../../components/MyCharacter/TutorialModal.tsx';
import useUserEquipments from '../../hooks/useUserEquipments.ts';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_ARRAY_SCORES,
  GET_USER_CLASS,
  GET_USER_RACE,
  UPDATE_ABILITY_SCORES,
  UPDATE_USER_CLASS,
  UPDATE_USER_RACE,
} from '../../../../backend/src/graphql/queries.ts';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.tsx';
import useClasses from '../../hooks/useClasses.ts';
import Counter from '../../components/Counter/Counter.tsx';
import classImageMapping from '../../utils/classImageMapping.ts';
import useRaces from '../../hooks/useRaces.ts';
import raceImageMapping from '../../utils/raceImageMapping.ts';

const abilityScoreMap: { [key: string]: number } = {
  WIS: 5,
  STR: 4,
  INT: 3,
  DEX: 2,
  CON: 1,
  CHA: 0,
};

const MyCharacterPage = () => {
  const { userEquipments } = useUserEquipments();
  const { userId } = useContext(AuthContext);

  // classes
  const { data: userClassData } = useQuery(GET_USER_CLASS, {
    variables: { userId },
    skip: !userId,
  });
  const [updateUserClass] = useMutation(UPDATE_USER_CLASS);
  const currentPage = 1;
  const classesPerPage = 12;
  const { classes: classData } = useClasses(currentPage, classesPerPage);
  const [classIndex, setClassIndex] = useState(0);
  const [classImageLoaded, setClassImageLoaded] = useState(false);

  //AbilityScore
  const { data, loading } = useQuery(GET_ARRAY_SCORES, {
    variables: { userId },
  });
  const [updateAbilityScores] = useMutation(UPDATE_ABILITY_SCORES);
  const [scores, setScores] = useState<number[]>(Array(6).fill(0));

  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(
    userClassData?.user?.class?.id || (classData.length > 0 ? classData[0].id : undefined)
  );

  // races

  const { data: userRaceData } = useQuery(GET_USER_RACE, {
    variables: { userId },
    skip: !userId,
  });
  const { races: raceData } = useRaces(currentPage, classesPerPage);
  const [raceImageLoaded, setRaceImageLoaded] = useState(false);
  const [raceIndex, setRaceIndex] = useState(0);
  const [selectedRaceID, setSelectedRaceId] = useState<string | undefined>(
    userRaceData?.user?.race?.id || (raceData.length > 0 ? raceData[0].id : undefined)
  );

  const [updateUserRace] = useMutation(UPDATE_USER_RACE);

  useEffect(() => {
    if (data && data.getArrayScores) {
      setScores(data.getArrayScores);
    }
  }, [data]);

  useEffect(() => {
    if (userClassData?.user?.class?.id) {
      setSelectedClassId(userClassData.user.class.id);
      // Find and set the index of the selected class
      const selectedIndex = classData.findIndex((c) => c.id === userClassData.user.class.id);
      if (selectedIndex !== -1) {
        setClassIndex(selectedIndex);
      }
    } else if (classData.length > 0) {
      setSelectedClassId(classData[0].id);
    }
  }, [userClassData, classData]);
  useEffect(() => {
    if (userRaceData?.user?.race?.id) {
      setSelectedRaceId(userRaceData.user.race.id);
      // Find and set the index of the selected race
      const selectedIndex = raceData.findIndex((c) => c.id === userRaceData.user.race.id);
      if (selectedIndex !== -1) {
        setRaceIndex(selectedIndex);
      }
    } else if (raceData.length > 0) {
      setSelectedRaceId(raceData[0].id);
    }
  }, [userRaceData, raceData]);

  const handleCounterChange = async (index: number, newValue: number) => {
    const updatedScores = [...scores];
    updatedScores[index] = newValue;
    setScores(updatedScores);

    try {
      await updateAbilityScores({ variables: { userId, scores: updatedScores } });
    } catch (error) {
      console.error('Error updating ability scores:', error);
    }
  };

  const handleClassSelect = async () => {
    const currentClass = classData[classIndex];
    if (currentClass) {
      try {
        await updateUserClass({
          variables: {
            userId,
            classId: currentClass.id,
          },
        });
        setSelectedClassId(currentClass.id);
      } catch (error) {
        console.error('Error updating user class:', error);
      }
    }
  };
  const handleRaceSelect = async () => {
    const currentRace = raceData[raceIndex];
    if (currentRace) {
      try {
        await updateUserRace({
          variables: {
            userId,
            raceId: currentRace.id,
          },
        });
        setSelectedRaceId(currentRace.id);
      } catch (error) {
        console.error('Error updating race:', error);
      }
    }
  };

  const handleNextClass = () => {
    const newIndex = (classIndex + 1) % classData.length;
    setClassIndex(newIndex);
  };

  const handlePrevClass = () => {
    const newIndex = (classIndex - 1 + classData.length) % classData.length;
    setClassIndex(newIndex);
  };

  const handleNextRace = () => {
    const newIndex = (raceIndex + 1) % raceData.length;
    setRaceIndex(newIndex);
  };
  const handlePrevRace = () => {
    const newIndex = (raceIndex - 1 + raceData.length) % raceData.length;
    setRaceIndex(newIndex);
  };

  const currentClass = classData[classIndex];
  const currentClassImage = currentClass ? classImageMapping[currentClass.index] : '';

  const currentRace = raceData[raceIndex];
  const currentRaceImage = currentRace ? raceImageMapping[currentRace.index] : '';
  return (
    <MainPageLayout>
      <main className="main before:bg-myCharacter">
        <div className="black-overlay" />
        <div className="wrapper w-full py-[15vh] gap-32">
          <h1 className="header">My Character</h1>
          <TutorialModal />
          {/* Race section */}
          <section className="w-full flex flex-col lg:flex-row justify-between">
            <article className="w-full xl:w-1/2 flex flex-col items-center">
              <h2 className="header">Race:</h2>
              <div className="flex items-center">
                <button className="arrow-button" onClick={handlePrevRace}>
                  <FaChevronLeft />
                </button>
                {currentRace && (
                  <article className="flex flex-col justify-center items-center gap-4 min-w-52">
                    {/*<h3 className="sub-header">{currentRace.name}</h3>*/}
                    <div className="flex justify-center items-center w-[70vw] h-[30vh] lg:w-[20vw] lg:h-[25vh] overflow-hidden">
                      {!raceImageLoaded && <div className="flex justify-center w-full">Loading image...</div>}
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
                <button className="arrow-button" onClick={handleNextRace}>
                  <FaChevronRight />
                </button>
                <button
                  onClick={handleRaceSelect}
                  className={`mt-4 px-6 py-2 rounded-md ${
                    selectedRaceID === currentRace?.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-customRed-500 text-white hover:bg-customRed-600'
                  }`}
                  disabled={selectedRaceID === currentRace?.id}
                >
                  {selectedRaceID === currentRace?.id ? 'Current Race' : 'Select Race'}
                </button>
              </div>
            </article>

            {/* Class section */}
            <article className="w-full xl:w-1/2 flex flex-col items-center mt-[10vh] lg:mt-0">
              <h2 className="header">Class:</h2>
              <div className="flex items-center gap-4">
                <button className="arrow-button" onClick={handlePrevClass}>
                  <FaChevronLeft />
                </button>
                {currentClass && (
                  <article className="flex flex-col items-center gap-4">
                    <h3 className="sub-header">{currentClass.name}</h3>
                    <div className="flex justify-center items-center w-[65vw] h-[25vh] lg:w-[25vw] lg:h-[25vh] overflow-hidden">
                      {!classImageLoaded && <div className="flex justify-center w-full py-24">Loading image...</div>}
                      <img
                        src={currentClassImage}
                        alt={currentClass.name}
                        className="w-full h-full object-contain shadow-none"
                        onLoad={() => setClassImageLoaded(true)}
                        style={{ display: classImageLoaded ? 'block' : 'none' }}
                      />
                    </div>
                  </article>
                )}
                <button className="arrow-button" onClick={handleNextClass}>
                  <FaChevronRight />
                </button>
                <button
                  onClick={handleClassSelect}
                  className={`mt-4 px-6 py-2 rounded-md ${
                    selectedClassId === currentClass?.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-customRed-500 text-white hover:bg-customRed-600'
                  }`}
                  disabled={selectedClassId === currentClass?.id}
                >
                  {selectedClassId === currentClass?.id ? 'Current Class' : 'Select Class'}
                </button>
              </div>
            </article>
          </section>
          {/* Ability scores section */}
          <article className="flex flex-col items-center w-full">
            <h2 className="header mb-[8vh]">Ability Scores:</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[12vh] gap-x-[25vw]">
              {Object.keys(abilityScoreMap).map((key, index) => (
                <div key={index} className="flex items-center">
                  <label className="sub-header w-32 mr-[85px]">{key}:</label>
                  <Counter
                    scale={1.5}
                    value={scores[abilityScoreMap[key]]}
                    onChange={(newValue) => handleCounterChange(abilityScoreMap[key], newValue)}
                  />
                </div>
              ))}
            </div>
          </article>

          {/* Equipment section */}
          <article className="flex flex-col items-center w-full mt-10">
            <h2 className="header mb-[5vh]">Equipments:</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[5vh] gap-x-[40vw] xl:gap-y-[10vh]">
              {loading && <div>Loading equipments...</div>}
              {userEquipments.length < 1 && <p>No equipments added yet...</p>}
              <ul>
                {userEquipments.map((equipment, index) => (
                  <li key={index} className="list-disc list-inside sub-header">
                    {equipment.name}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </main>
    </MainPageLayout>
  );
};

export default MyCharacterPage;
