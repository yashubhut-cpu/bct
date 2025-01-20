import React from 'react'

function GroupSliding({ isOpen, onClose, children }) {
  return (
    <div>
       <div
        className={`fixed top-0 right-0 h-screen bg-[#1C2546] shadow-lg transform transition-transform duration-300 overflow-y-scroll min-w-96 scrollbar ${
          isOpen ? "translate-x-0" : "translate-x-full"
          } w-[40%]`} /* Set width to 40% */
        style={{
          margin: 0, // Removes any unnecessary margin
          padding: 0, // Removes any unnecessary padding
          zIndex: 1000, // Ensures the panel is on top of everything  
        }}
        id="style-2">


        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-[30px]"
          onClick={onClose}
        >
          ✕ {/* Unicode character for "X" */}
        </button>
 
        {/* Panel Content */}
        {/* <div className="p-6">
          {children}
        </div> */}
      </div>

       {/* Overlay */}
      {isOpen && (
        <div className={`fixed inset-0 transition-opacity duration-300 z-20 ${
          isOpen ? "bg-black bg-opacity-50 visible" : "bg-opacity-0 invisible"
          }`}
          onClick={onClose}
        ></div>
      )}
    </div>
  )
}

export default GroupSliding
