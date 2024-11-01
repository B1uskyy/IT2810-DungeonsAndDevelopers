import { Dispatch, SetStateAction } from 'react';

export interface MonsterFilterProps {
  selectedFilters: Set<string>;
  setSelectedFilters: Dispatch<SetStateAction<Set<string>>>;
}
