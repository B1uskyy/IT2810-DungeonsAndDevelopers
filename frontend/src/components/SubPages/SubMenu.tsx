import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../CustomButton/CustomButton.tsx';

const SubMenu = () => {
  const location = useLocation();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Helper function to check if the button link matches the current path
  const isActive = (linkTo: string) => location.pathname === linkTo;

  return (
    <section className="flex w-full h-30 justify-center items-center text-center z-10 space-x-5">
      {/* Race Button */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex items-center justify-center ${
          isActive('/project2/race') ? 'bold' : '' // Always keep bold for active
        } ${hoveredButton === '/project2/race' || (!hoveredButton && isActive('/project2/race')) ? 'flex-grow-2' : ''}`}
        onMouseEnter={() => setHoveredButton('/project2/race')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Button
          text="Race"
          linkTo="/project2/race"
          noUnderline={true}
          className="text-white text-2xl w-full justify-center"
        />
      </div>
      <div className="h-14 w-0.5 bg-customRed"></div>

      {/* Class Button */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex items-center justify-center ${
          isActive('/project2/class') ? 'bold' : '' // Always keep bold for active
        } ${hoveredButton === '/project2/class' || (!hoveredButton && isActive('/project2/class')) ? 'flex-grow-2' : ''}`}
        onMouseEnter={() => setHoveredButton('/project2/class')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Button
          text="Class"
          linkTo="/project2/class"
          noUnderline={true}
          className="text-white text-2xl w-full justify-center"
        />
      </div>
      <div className="h-14 w-0.5 bg-customRed"></div>

      {/* Ability Scores Button */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex items-center justify-center ${
          isActive('/project2/abilityscore') ? 'bold' : '' // Always keep bold for active
        } ${hoveredButton === '/project2/abilityscore' || (!hoveredButton && isActive('/project2/abilityscore')) ? 'flex-grow-2' : ''}`}
        onMouseEnter={() => setHoveredButton('/project2/abilityscore')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Button
          text="Ability scores"
          linkTo="/project2/abilityscore"
          noUnderline={true}
          className="text-white text-2xl w-full justify-center"
        />
      </div>
    </section>
  );
};

export default SubMenu;