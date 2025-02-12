import React, { useState, useRef, useEffect, useMemo } from "react";
import { RiArrowDropDownLine, RiCloseCircleFill } from "react-icons/ri";

const CustomMultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
  isMulti = false,
}) => {

  const initialValue = useMemo(() => (isMulti ? [] : null), [isMulti]);
  const [selectedValue, setSelectedValue] = useState(value || initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value || initialValue);
  }, [value, initialValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue) => {
    if (isMulti) {
      const newValues = selectedValue.includes(optionValue)
        ? selectedValue.filter((val) => val !== optionValue)
        : [...selectedValue, optionValue]; 
      setSelectedValue(newValues);
      onChange(newValues);
    } else {
      setSelectedValue(optionValue);
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const handleClear = (e, optionValue) => {
    e.stopPropagation();
    if (isMulti) {
      const newValues = selectedValue.filter((val) => val !== optionValue);
      setSelectedValue(newValues);
      onChange(newValues);
    } else {
      setSelectedValue(null);
      onChange(null);
    }
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      {/* Input Display */}
      <div
        className="w-full flex items-center justify-between gap-2 pl-4 py-1 text-sm bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-wrap gap-1">
          {isMulti ? (
            selectedValue.length > 0 ? (
              selectedValue.map((val) => (
                <span
                  key={val}
                  className="flex items-center border border-gray-600 text-white px-2 py-1 rounded-md text-xs"
                >
                  {options.find((opt) => opt.value === val)?.label}
                  <RiCloseCircleFill
                    className="ml-1 cursor-pointer hover:text-red-500"
                    onClick={(e) => handleClear(e, val)}
                  />
                </span>
              ))
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )
          ) : selectedValue ? (
            <span className="text-white">
              {options.find((opt) => opt.value === selectedValue)?.label}
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <RiArrowDropDownLine className="w-7 h-7 text-gray-400" />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#1C2546] border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.length === 0 ? (
            <div className="p-3 text-gray-400">
              Select Segmentation Criteria First
            </div>
          ) : (
            options
              .filter((option) =>
                isMulti ? !selectedValue.includes(option.value) : true
              )
              .map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-blue-500 overflow-hidden"
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
