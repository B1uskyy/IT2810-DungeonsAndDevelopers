import React from 'react';
import Navbar from '../Navbar/Navbar.tsx';
import SubMenu from '../SubPages/SubMenu.tsx';

interface SubPageLayoutProps {
  children: React.ReactNode;
}

const SubPageLayout: React.FC<SubPageLayoutProps> = ({ children }) => {
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
          <SubMenu />
          {children}
        </section>
      </main>
    </>
  );
};

export default SubPageLayout;