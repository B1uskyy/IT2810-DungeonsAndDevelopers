import React from 'react';
import Navbar from '../Navbar/Navbar.tsx';
import SubMenu from '../SubPages/SubMenu.tsx';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface SubPageLayoutProps {
  children: React.ReactNode;
}

const SubPageLayout: React.FC<SubPageLayoutProps> = ({ children }) => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const location = useLocation();

  // Function to determine the header text based on the route
  const getHeaderText = () => {
    if (location.pathname.includes('/project2/race')) return 'Race';
    if (location.pathname.includes('/project2/class')) return 'Class';
    if (location.pathname.includes('/project2/abilityscore')) return 'Ability Scores';
    return '';
  };

  return (
    <>
      <Navbar />
      <main
        className="relative flex flex-col justify-center items-center w-full bg-subPage bg-cover bg-center min-h-screen">
        {/* Overlay with solid black top, gradient transition, and semi-transparent background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-[10%] bg-black"></div>
          <div className="absolute top-[10%] left-0 w-full h-[10%] bg-gradient-to-b from-black to-black/50"></div>
          <div className="absolute top-[20%] left-0 w-full h-[80%] bg-black opacity-50"></div>
        </div>

        <section className="py-40 w-3/4 flex flex-col items-center gap-36">
          {/* Conditionally render SubMenu or a header based on screen size */}
          {isLargeScreen ? (
            <SubMenu />
          ) : (
            <h1 className="header bold z-10">{getHeaderText()}</h1>
          )}
          {children}
        </section>
      </main>
    </>
  );
};

export default SubPageLayout;