import { CiSearch } from 'react-icons/ci';

interface SearchBarProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar = ({ searchTerm, handleSearchChange, placeholder = 'Search for a monster...' }: SearchBarProps) => {
  return (
    <div className="relative flex justify-center items-center">
      <CiSearch size="25" className="absolute left-3 top-1/2 transform -translate-y-[60%] text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-12 px-[1vw] py-[0.5vh] w-[75vw] sm:w-[60vw] md:w-[50vw] xl:w-[30vw] 2xl:w-[25vw] rounded-lg border !text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 sub-header"
      />
    </div>
  );
};

export default SearchBar;