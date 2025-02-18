"use client";

import React, { useState } from "react";
import styles from "./dashboard.module.css";

export default function WeekSelector({ selectedWeek, onWeekChange }) {
  const [isOpen, setIsOpen] = useState(false);

  // Define the weeks with correct API values
  const weeks = [
    { label: "This Week", value: "current_week" },
    { label: "Previous Week", value: "previous_week" },
  ];

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  // Handle week selection
  const handleWeekClick = (week) => {
    onWeekChange(week); // Pass the selected week value to the parent component
    setIsOpen(false);
  };

  // Find the label for the selected week
  const selectedWeekLabel =
    weeks.find((week) => week.value === selectedWeek)?.label || "Select Week";

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
        {selectedWeekLabel}
      </button>

      {isOpen && (
        <ul
          className={
            styles.dropdownMenu +
            " absolute bg-[#2e3e77] p-3 w-full z-30 mt-1 rounded-md text-sm text-[#ffffff]"
          }
        >
          {weeks.map((week, index) => (
            <li
              key={index}
              className={
                styles.dropdownItem +
                " cursor-pointer py-2 border-b border-gray-600"
              }
              onClick={() => handleWeekClick(week.value)}
            >
              {week.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
