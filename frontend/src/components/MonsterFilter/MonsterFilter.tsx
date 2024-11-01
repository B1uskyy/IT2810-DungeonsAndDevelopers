import { useState } from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.tsx';
import { FiX } from 'react-icons/fi';
import { MonsterFilterProps } from '../../interfaces/MonsterFilterProps.ts';

const filterOptions = [
  'dragon',
  'aberration',
  'humanoid',
  'monstrosity',
  'beast',
  'plant',
  'construct',
  'fiend',
  'fey',
  'giant',
  'undead',
  'elemental',
];

export default function MonsterFilter({ selectedFilters, setSelectedFilters }: MonsterFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (option: string) => {
    setSelectedFilters((prev: Set<string>) => {
      const newFilters = new Set(prev);
      if (newFilters.has(option)) {
        newFilters.delete(option);
      } else {
        newFilters.add(option);
      }
      return newFilters;
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setSelectedFilters(new Set());
  };

  return (
    <div className="relative text-white">
      <button
        onClick={toggleDropdown}
        className="text px-1 rounded-md bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed hover:text-customRed transition-colors duration-200"
      >
        Filter Monsters
      </button>
      {isDropdownOpen && (
        <div className="absolute bg-customGray shadow-xl shadow-black p-4 rounded mt-2 w-48">
          <div className="flex justify-between items-center mb-6">
            <button onClick={clearFilters} className="underline transition-all hover:text-gray-300 outline-none">
              Clear Filters
            </button>
            <FiX className="h-6 w-6 text-white hover:text-customRed cursor-pointer" onClick={toggleDropdown} />
          </div>
          {filterOptions.map((option) => (
            <label key={option} className="flex items-center gap-5 mb-4 hover:cursor-pointer">
              <CustomCheckbox
                checked={selectedFilters.has(option)}
                onChange={() => handleCheckboxChange(option)}
                scale={0.8}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
