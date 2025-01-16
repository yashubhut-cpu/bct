'use client'

import React, { useState } from 'react';
import styles from './dashboard.module.css';

export default function YearSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('This Year');
  const [customDate, setCustomDate] = useState('');

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  // Set selected option and close the dropdown
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Handle date change in custom date picker
  const handleDateChange = (event) => {
    setCustomDate(event.target.value);
  };

  return (
    <div className={styles.dropdown}>
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
        {selectedOption}
      </button>
      
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li className={styles.dropdownItem} onClick={() => handleOptionClick('This Year')}>
            This Year
          </li>
          <li className={styles.dropdownItem} onClick={() => handleOptionClick('This Month')}>
            This Month
          </li>
          <li className={styles.dropdownItem} onClick={() => handleOptionClick('This Week')}>
            This Week
          </li>
          <li className={styles.dropdownItem} onClick={() => handleOptionClick('Today')}>
            Today
          </li>
          <li className={styles.dropdownItem} onClick={() => handleOptionClick('Custom Date')}>
            Custom Date
          </li>
        </ul>
      )}
      
      {/* Show date picker only when "Custom Date" is selected */}
      {selectedOption === 'Custom Date' && (
        <div className={styles.datePickerWrapper}>
          <label htmlFor="customDate" className={styles.dateLabel}>Select a Date:</label>
          <input
            type="date"
            id="customDate"
            value={customDate}
            onChange={handleDateChange}
            className={styles.datePicker}
          />
        </div>
      )}
    </div>
  );
}
