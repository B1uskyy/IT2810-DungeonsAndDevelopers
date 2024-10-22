import { useState, useEffect } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg';
import CustomButton from '../CustomButton/CustomButton.tsx';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent scrolling when slide-in menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
        return;
      }

      const scrollThreshold = 10;

      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`${
          showNavbar ? 'top-0' : '-top-20'
        } fixed w-full bg-customRed text-white p-2 z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="flex xl:justify-center justify-between items-center xl:w-full">
          <Link to={'/project2/home'}>
            <img src={logo} alt="Dungeons & Developers logo" className="w-12 ml-6 xl:hidden shadow-none" />
          </Link>

          {/* Hamburger Icon */}
          <div className="flex items-center mr-6 xl:hidden">
            <button
              onClick={toggleMenu}
              className="text-4xl "
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Menu for large screens */}
          <div className="hidden xl:flex justify-between items-center w-11/12">
            <Link to={'/project2/home'}>
              <img src={logo} alt="Dungeons & Developers logo" className="w-16 xl:block hidden shadow-none" />
            </Link>
            <section className="flex justify-between 4xl:w-3/5 w-4/5">
              <CustomButton text={'Monsters'} linkTo={'/project2/monsters'}
                            isActive={location.pathname === '/project2/monsters'} />
              <CustomButton text={'Dungeon'} linkTo={'/project2/dungeon'}
                            isActive={location.pathname === '/project2/dungeon'} />

              <div
                className="relative"
                onMouseEnter={() => setIsDropdownHovered(true)}
                onMouseLeave={() => setIsDropdownHovered(false)}
              >
                <CustomButton
                  text={'My character'}
                  linkTo={'/project2/mycharacter'}
                  className={`flex items-center space-x-3`}
                  isActive={location.pathname.startsWith('/project2/mycharacter')}
                >
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      isDropdownHovered ? 'rotate-180' : ''
                    }`}
                  />
                </CustomButton>

                {/* Dropdown menu */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-72 bg-customRed rounded overflow-hidden duration-300 ease-in-out max-h-0 ${
                    isDropdownHovered ? 'max-h-96 opacity-100' : 'opacity-0'
                  }`}
                >
                  <ul className="flex flex-col gap-10 p-10">
                    <li className="w-fit">
                      <CustomButton text={'Races'} linkTo={'/project2/race'}
                                    isActive={location.pathname === '/project2/race'} />
                    </li>
                    <li className="w-fit">
                      <CustomButton text={'Classes'} linkTo={'/project2/class'}
                                    isActive={location.pathname === '/project2/class'} />
                    </li>
                    <li className="w-fit">
                      <CustomButton text={'Ability Scores'} linkTo={'/project2/abilityscore'}
                                    isActive={location.pathname === '/project2/abilityscore'} />
                    </li>
                    <li className="w-fit">
                      <CustomButton text={'Equipments'} linkTo={'/project2/equipment'}
                                    isActive={location.pathname === '/project2/equipment'} />
                    </li>
                  </ul>
                </div>
              </div>

              <CustomButton text={'Log out'} linkTo={'/project2'} isActive={location.pathname === '/project2'}>
                <IoIosLogOut className="ml-2 mt-0.5" />
              </CustomButton>
            </section>
          </div>
        </div>
      </nav>

      {/* Slide-in Menu for small screens */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-customRed text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:hidden pl-4 pt-10 z-50`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-10 text-4xl">
          <FiX />
        </button>
        <ul className="mt-16 space-y-10">
          <li>
            <CustomButton text={'Monsters'} linkTo={'/project2/monsters'} className="text-xl" noUnderline={true}
                          isActive={location.pathname === '/project2/monsters'} />
          </li>
          <li>
            <CustomButton text={'Dungeon'} linkTo={'/project2/dungeon'} className="text-xl" noUnderline={true}
                          isActive={location.pathname === '/project2/dungeon'} />
          </li>
          <li>
            <div className="space-y-2">
              <div className="flex">
                <CustomButton text={'My character'} linkTo={'/project2/mycharacter'} className="text-xl"
                              noUnderline={true}
                              isActive={location.pathname.startsWith('/project2/mycharacter')} />
                <FaChevronDown
                  onClick={toggleMobileDropdown}
                  className={`transition-transform duration-300 ml-11 size-6 ${
                    isMobileDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isMobileDropdownOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2 pl-4">
                  <li>
                    <CustomButton text={'Races'} linkTo={'/project2/race'} className="px-4 py-2 text-xl"
                                  noUnderline={true}
                                  isActive={location.pathname === '/project2/race'} />
                  </li>
                  <li>
                    <CustomButton text={'Classes'} linkTo={'/project2/class'} className="px-4 py-2 text-xl"
                                  noUnderline={true}
                                  isActive={location.pathname === '/project2/class'} />
                  </li>
                  <li>
                    <CustomButton text={'Ability Scores'} linkTo={'/project2/abilityscore'}
                                  className="px-4 py-2 text-xl"
                                  noUnderline={true} isActive={location.pathname === '/project2/abilityscore'} />
                  </li>
                  <li>
                    <CustomButton text={'Equipments'} linkTo={'/project2/equipment'} className="px-4 py-2 text-xl"
                                  noUnderline={true} isActive={location.pathname === '/project2/equipment'} />
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <CustomButton text={'Log out'} linkTo={'/project2'} className="text-xl flex items-center"
                          isActive={location.pathname === '/project2'}>
              <IoIosLogOut className="ml-2" />
            </CustomButton>
          </li>
        </ul>
      </div>

      {/* Blur effect on background when slide-in menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;