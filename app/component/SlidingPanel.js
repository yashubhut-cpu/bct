import React from "react";

const SlidingPanel = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-screen bg-[#1C2546] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-[40%]`} /* Set width to 40% */
        style={{
          margin: 0, // Removes any unnecessary margin
          padding: 0, // Removes any unnecessary padding
        }}
      >


        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400"
          onClick={onClose}
        >
          ✕ {/* Unicode character for "X" */}
        </button>

        {/* Panel Content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default SlidingPanel;








