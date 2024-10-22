import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/mainPages/loginPage.tsx';
import HomePage from '../../pages/mainPages/homePage.tsx';
import DungeonPage from '../../pages/mainPages/dungeonPage.tsx';
import ClassPage from '../../pages/subPages/classPage.tsx';
import RacePage from '../../pages/subPages/racePage.tsx';
import AbilityScorePage from '../../pages/subPages/abilityScorePage.tsx';
import EquipmentPage from '../../pages/subPages/equipmentPage.tsx';
import MonsterPage from '../../pages/mainPages/monsterPage.tsx';
import MyCharacterPage from '../../pages/mainPages/myCharacterPage.tsx';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to the top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/project2" element={<LoginPage />} />
        <Route path="/project2/home" element={<HomePage />} />
        <Route path="/project2/dungeon" element={<DungeonPage />} />
        <Route path="/project2/class" element={<ClassPage />} />
        <Route path="/project2/race" element={<RacePage />} />
        <Route path="/project2/abilityscore" element={<AbilityScorePage />} />
        <Route path="/project2/equipment" element={<EquipmentPage />} />
        <Route path="/project2/monsters" element={<MonsterPage />} />
        <Route path="/project2/mycharacter" element={<MyCharacterPage />} />
      </Routes>
    </AnimatePresence>
  );
}