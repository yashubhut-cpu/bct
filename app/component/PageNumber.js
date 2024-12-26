// components/PageNumber.js
"use client";

import React from "react";

const PageNumber = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center justify-center">
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-10 h-10 flex items-center justify-center rounded border ${
                currentPage === pageNumber
                  ? "bg-blue-700 text-white border-blue-500"
                  : "bg-transparent text-gray-400 border-gray-500"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PageNumber;





















