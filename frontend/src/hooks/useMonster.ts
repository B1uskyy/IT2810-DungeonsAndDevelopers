import { useQueries, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { defaultURL, monstersURL } from '../constants';

/**
 * Interface representing the structure of a Monster object.
 */
export interface Monster {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  hit_points: number;
  hit_dice: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  image: string;
}

/**
 * Interface representing the structure of MonsterCardDataProps.
 */
export interface MonsterCardDataProps {
  index: string;
  name: string;
  type: string;
  hp: number;
  alignment: string;
  size: string;
  img?: string;
}

/**
 * Fetches the details of a monster from the API.
 * @param {string} monsterIndex - The index of the monster to fetch.
 * @returns {Promise<Monster>} - A promise that resolves to the monster data.
 * @throws Will throw an error if the request fails.
 */
export const fetchMonster = async (monsterIndex: string): Promise<Monster> => {
  try {
    const { data } = await axios.get(`${monstersURL}/${monsterIndex}`);
    return data;
  } catch (error) {
    console.error('Error fetching monster:', monsterIndex, error);
    throw error;
  }
};

/**
 * Maps the Monster data to MonsterCardDataProps.
 * @param {Monster} data - The monster data to map.
 * @returns {MonsterCardDataProps} - The mapped monster card data.
 */
const mapToCard = (data: Monster): MonsterCardDataProps => {
  return {
    index: data.index,
    name: data.name,
    type: data.type,
    hp: data.hit_points,
    alignment: data.alignment,
    size: data.size,
    img: data.image ? `${defaultURL}${data.image}` : undefined,
  };
};

/**
 * Custom hook to fetch and filter multiple monsters' data using React Query.
 * @param {string[]} monsterIndexes - The indices of all available monsters.
 * @param {string} searchTerm - The search term to filter monsters.
 * @param {number} currentPage - The current page number.
 * @param {number} monstersPerPage - The number of monsters to display per page.
 * @param {boolean} [fullDetails=false] - Whether to fetch full details or just card data.
 * @returns {UseQueryResult<Monster | MonsterCardDataProps, Error>[]} - An array of query results.
 */
function useMonster(
  monsterIndexes: string[],
  searchTerm: string,
  currentPage: number,
  monstersPerPage: number,
  fullDetails: boolean = false,
): UseQueryResult<Monster | MonsterCardDataProps, Error>[] {
  const filteredMonsters = useMemo(
    () => searchTerm === ''
      ? monsterIndexes
      : monsterIndexes.filter((monsterIndex) =>
        monsterIndex.toLowerCase().includes(searchTerm.toLowerCase().replace(/\s+/g, '-')),
      ),
    [monsterIndexes, searchTerm],
  );

  const paginatedMonsters = useMemo(
    () => filteredMonsters.slice(
      (currentPage - 1) * monstersPerPage,
      currentPage * monstersPerPage,
    ),
    [filteredMonsters, currentPage, monstersPerPage],
  );

  const queries = paginatedMonsters.map((index) => ({
    queryKey: ['monster', index, searchTerm],
    queryFn: () => fetchMonster(index),
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data: Monster) => (fullDetails ? data : mapToCard(data)),
  }));

  return useQueries({ queries });
}

export default useMonster;
