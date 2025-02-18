"use client";

import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

export default function YearSelector({ selectedYear, onYearChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [years, setYears] = useState([]);

  // Generate a list of years dynamically
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let year = currentYear; year >= currentYear - 3; year--) {
      yearsList.push(year);
    }
    setYears(yearsList);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  // Handle year selection
  const handleYearClick = (year) => {
    onYearChange(year); // Pass the selected year to the parent component
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown + " relative"}>
      <button className={styles.button} onClick={toggleDropdown}>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        {selectedYear}
      </button>

      {isOpen && (
        <ul
          className={
            styles.dropdownMenu +
            " absolute bg-[#2e3e77] p-3 w-full z-30 mt-1 rounded-md text-sm text-[#ffffff]"
          }
        >
          {years.map((year) => (
            <li
              key={year}
              className={
                styles.dropdownItem +
                " cursor-pointer py-1 border-b border-gray-600"
              }
              onClick={() => handleYearClick(year)}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
