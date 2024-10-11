import { Button } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MonsterCard from '../../components/MonsterCard/MonsterCard';
import mockup, { Monster } from '../../data/mockup';
import useMonster, { MonsterCardDataProps } from '../../hooks/useMonster.ts';
import { hourglass } from 'ldrs';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import { CiSearch } from 'react-icons/ci';

const monsterIndexArray: string[] = mockup.results.map((result: Monster) => result.index);
const monstersPerPage = 8;

export default function MonsterPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Used for loading screen
  hourglass.register();

  const monsterData = useMonster(
    monsterIndexArray,
    debouncedSearchTerm,
    currentPage,
    monstersPerPage,
    false,
  ) as UseQueryResult<MonsterCardDataProps, Error>[];

  const filteredMonsters = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? monsterIndexArray
        : monsterIndexArray.filter((monsterIndex) =>
          monsterIndex.includes(debouncedSearchTerm.toLowerCase().replace(/\s+/g, '-')),
        ),
    [debouncedSearchTerm],
  );

  // Apply pagination to filtered results
  const totalFilteredMonsters = filteredMonsters.length;
  const totalPages = Math.ceil(totalFilteredMonsters / monstersPerPage);

  // https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 300),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleMonsterLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const allImagesLoaded = loadedImages.size === monsterData.length;

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setLoadedImages(new Set());
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoadedImages(new Set());
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setLoadedImages(new Set());
  }, [debouncedSearchTerm]);

  const isLoading = monsterData.some((monster) => monster.isLoading) || !allImagesLoaded;
  const isError = monsterData.some((monster) => monster.isError);

  const displayedMonsters = monsterData.filter((monster) => monster.data && !monster.isLoading && !monster.isError);

  return (
    <MainPageLayout>
      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full z-0 before:absolute before:inset-0 before:bg-monsters before:bg-cover before:bg-center before:z-0">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70" />

        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <l-hourglass size="70" bg-opacity="0.1" speed="1.75" color="white"></l-hourglass>
          </div>
        )}
        <section
          className={`flex flex-col py-10 text-white min-h-[calc(100vh-100px)] min-w-[70%] z-10 mt-24 ${
            isLoading ? 'hidden' : ''
          }`}
          style={{ display: isLoading ? 'none' : 'block' }}
        >
          <div className="relative w-full flex items-center justify-center mb-10">
            <div className="absolute left-0">
              <CiSearch size={25} className="absolute left-3 top-1/2 transform -translate-y-[60%] text-gray-400" />
              <input
                type="text"
                placeholder="Search for a monster..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-12 px-4 py-3 w-72 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
              />
            </div>
            <h2 className="text-4xl text-center">Monsters</h2>
          </div>
          {isError ? (
            <p className="text-white mt-4">An error occurred while loading monsters.</p>
          ) : displayedMonsters.length > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-8 mt-8">
                {displayedMonsters.map((monster, idx) => (
                  <MonsterCard key={idx} {...monster.data!} onLoad={() => handleMonsterLoad(idx)} />
                ))}
              </div>
              {totalFilteredMonsters > monstersPerPage && (
                <div className="mt-4 flex items-center space-x-4">
                  <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous Page
                  </Button>
                  <p className="text-white">
                    Page: {currentPage}/{totalPages}
                  </p>
                  <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next Page
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-white mt-4">No monsters found.</p>
          )}
        </section>
      </main>
    </MainPageLayout>
  );
}
