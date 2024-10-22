import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  onPageChange: (direction: number) => void; // direction can be -1 (prev) or 1 (next)
  totalPages: number; // Add totalPages prop to know the last page
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {
  return (
    <section className="flex justify-center gap-40 w-full text-xl mt-10">
      {/* Previous button - disabled when on the first page */}
      <button
        className="flex items-center hover:text-gray-400 w-44"
        onClick={() => onPageChange(-1)}
        disabled={currentPage === 1}  // Disable if on first page
      >
        <FaChevronLeft className="mr-2" />
        Previous Page
      </button>

      <span className="w-2 text-center">{currentPage}</span>

      {/* Next button - disabled when on the last page */}
      <button
        className="flex items-center hover:text-gray-400 w-44"
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages}  // Disable if on last page
      >
        Next Page
        <FaChevronRight className="ml-2" />
      </button>
    </section>
  );
};

export default Pagination;