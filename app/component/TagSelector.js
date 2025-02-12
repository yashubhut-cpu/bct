import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const TagSelector = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full flex items-center justify-between px-4 py-2 bg-[#1C2546] text-slate-400 rounded-lg border border-gray-600 cursor-pointer ${
          isOpen ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value ? (
          <span className="text-slate-400">
            {options.find((opt) => opt.value === value)?.label}
          </span>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
        <RiArrowDropDownLine className="w-8 h-8 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#1C2546] border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.length === 0 ? (
            <div className="p-3 text-slate-400">
              Select Segmentation Criteria First
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search tags..."
                className="w-full p-3 bg-[#1C2546] text-white border-b border-gray-600 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300 ease-in-out text-slate-300 flex items-center gap-2"
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="p-3 text-slate-400">No matching tags</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
