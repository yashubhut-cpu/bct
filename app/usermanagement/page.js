"use client";
import { useState } from "react";
import React from "react";
import styles from "../usermanagement/styles.module.css"; // Correctly import the CSS module here
import Sidebar from "../component/Sidebar/sidebar";
import Table from "../component/tablecomponent"; // Import the Table component
import columnsConfig from "../columnsConfig"; // Import the columnsConfig
import { ChevronRight } from "lucide-react";
import SlidingPanel from "../component/SlidingPanel"; // Import reusable SlidingPanel


export default function Usermanagement() {


  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // State for the sliding panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Data for the alerts table

  const alerts = [
    {
      name: "Dianne Russell",
      email: "diannerussell@gmail.com",
      role: "Editor",
      assignedGroups: ["Market Mavericks", "Trading Titans", "Equity Edge"],
      status: "Active"
    },
    {
      name: "Leslie Alexander",
      email: "lesliealexander@gmail.com",
      role: "Admin",
      assignedGroups: ["Trading Titans", "Equity Edge", "Bullish Breakouts"],
      status: "Active"
    },
    {
      name: "Kathryn Murphy",
      email: "kathrynmurphy@gmail.com",
      role: "Admin",
      assignedGroups: ["Equity Edge", "Bullish Breakouts"],
      status: "Active"
    },
    {
      name: "Annette Black",
      email: "annetteblack@gmail.com",
      role: "Editor",
      assignedGroups: ["Stock Savvy Alerts", "Securities Spotlight"],
      status: "Not Active"
    },
    {
      name: "Ralph Edwards",
      email: "ralphedwards@gmail.com",
      role: "Admin",
      assignedGroups: ["Bullish Breakouts", "Stock Savvy Alerts"],
      status: "Active"
    },
    {
      name: "Ronald Richards",
      email: "ronaldrichards@gmail.com",
      role: "Admin",
      assignedGroups: ["The Alert Authority", "Bullish Breakouts"],
      status: "Active"
    },
    {
      name: "Wade Warren",
      email: "wadewarren@gmail.com",
      role: "Editor",
      assignedGroups: ["Securities Spotlight", "Momentum Masters"],
      status: "Active"
    },
    {
      name: "Cody Fisher",
      email: "codyfisher@gmail.com",
      role: "Admin",
      assignedGroups: ["Profit Pioneers", "Stock Savvy Alerts"],
      status: "Active"
    },
    {
      name: "Robert Fox",
      email: "robertfox@gmail.com",
      role: "Editor",
      assignedGroups: ["Chart Chasers", "Bullish Breakouts"],
      status: "Not Active"
    },
    {
      name: "Cameron Green",
      email: "camerongreen@gmail.com",
      role: "Editor",
      assignedGroups: ["Trade Trailblazers", "Securities Spotlight"],
      status: "Active"
    },
    {
      name: "Jenny Wilson",
      email: "jennywilson@gmail.com",
      role: "Editor",
      assignedGroups: ["Momentum Masters", "Momentum Masters"],
      status: "Active"
    },
    {
      name: "Jane Cooper",
      email: "janecooper@gmail.com",
      role: "Admin",
      assignedGroups: ["Investment Insights Hub"],
      status: "Active"
    },
    {
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      role: "Editor",
      assignedGroups: ["The Alert Network", "Bullish Breakouts"],
      status: "Active"
    },
    {
      name: "Jerome Bell",
      email: "jeromebell@gmail.com",
      role: "Editor",
      assignedGroups: ["Risk and Reward", "Bullish Breakouts"],
      status: "Active"
    },
    {
      name: "Floyd Miles",
      email: "floydmiles@gmail.com",
      role: "Editor",
      assignedGroups: ["Options Overdrive", "Stock Savvy Alerts"],
      status: "Not Active"
    }
  ];


  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={handleSidebarToggle} />
      <div
        className={`${styles.mainContent} ${
          isSidebarCollapsed ? styles.collapsed : styles.expanded
        }`}
      >
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>

          {/* Group Management Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-[36px] text-white ml-[2%]">User Management</h2>
            <button className={styles.pageButton} onClick={togglePanel}>
              <img src="/images/add_user.svg" alt="Add Group Icon" />
              Add New User
            </button>
          </div>

          {/* Table Content */}
          <div className="mt-10">
            <div className="bg-[#1C2546] p-4 rounded-[20px] shadow ml-[2%] " style={{ width: "95%", height: "100%", marginleft: "2%" }}>
              <Table alerts={alerts} visibleColumns={columnsConfig.usermanagement} />
              {/* Page Number at Bottom Right */}
              {/* Pagination Section */}
              <div className={styles.pagination}>
                <button
                  className={`${styles.paginationButton} ${styles.active}`}
                >
                  1
                </button>
                <button className={styles.paginationButton}>2</button>
                <button className={styles.paginationButton}>3</button>
                <button className={styles.paginationButton}>...</button>
                <button className={styles.paginationButton}>80</button>
                <button className={styles.paginationButton}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Sliding Panel */}
        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={togglePanel}
          width="w-[700px]" // Fixed width 700px
          style={{
            height: "685px", // Fixed height
            top: "0px", // Position from the top
            left: "998px", // Position from the left
            gap: "20px", // Gap between child elements

            opacity: isPanelOpen ? 1 : 0, // Opacity toggles based on panel state
            transition: "opacity 0.3s ease-in-out" // Smooth opacity transition
          }}
        >
          {/* Header Text */}
          <div className="p-6">
            <h2 className="text-white text-[36px]">Add/Edit Group</h2>
          </div>
          {/* Form Content */}
          <div className="p-6 bg-[#1C2546] text-white rounded-b-lg">
            <form onSubmit={e => e.preventDefault()}>
              {/* Group Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Group Name*
                </label>
                <input
                  type="text"
                  id="groupName"
                  placeholder="Enter your group Name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-white"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  placeholder="Group description goes here"
                  rows="4"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-white"
                ></textarea>
              </div>
              {/* Status Field */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Status*
                </label>
                <select
                  id="status"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Segmentation Criteria Field */}
              <div className="mb-4">
                <label
                  htmlFor="segmentation"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Segmentation Criteria*
                </label>
                <select
                  id="segmentation"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Segmentation Criteria
                  </option>
                  <option value="criteria1">Criteria 1</option>
                  <option value="criteria2">Criteria 2</option>
                  <option value="criteria3">Criteria 3</option>
                </select>
              </div>

              {/* Tag Assigned Field */}
              <div className="mb-4">
                <label
                  htmlFor="tagAssigned"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Tag Assigned*
                </label>
                <select
                  id="tagAssigned"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Tags
                  </option>
                  <option value="criteria1">Criteria 1</option>
                  <option value="criteria2">Criteria 2</option>
                  <option value="criteria3">Criteria 3</option>
                </select>
              </div>

              {/* Assign Editors Field */}
              <div className="mb-4">
                <label
                  htmlFor="assignEditors"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Assign Editors*
                </label>
                <select
                  id="assignEditors"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select o Assign Editors
                  </option>
                  <option value="editor1">Editor 1</option>
                  <option value="editor2">Editor 2</option>
                  <option value="editor3">Editor 3</option>
                </select>
                <div className="bg-[#293354] rounded-lg p-5 border border-[#1C2546]">
                  <div className="flex">
                    {/* Left Column - First 6 Names */}
                    <div className="w-1/2">
                      {[
                        "Jacob Jones",
                        "Theresa Webb",
                        "Arlene McCoy",
                        "Dianne Russell",
                        "Albert Flores",
                        "Ralph Edwards"
                      ].map((name, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`tag-left-${index}`}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={`tag-left-${index}`}
                            className="flex items-center cursor-pointer"
                          >
                            <div className="w-4 h-4 border-2 border-gray-500 rounded-sm peer-checked:bg-[#5177FF] peer-checked:border-[#5177FF] transition-all"></div>
                            <span className="ml-2 text-white text-sm">
                              {name}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Right Column - Next 6 Names */}
                    <div className="w-1/2">
                      {[
                        "Kathryn Murphy",
                        "Ronald Richards",
                        "Jane Cooper",
                        "Annette Black",
                        "Marvin McKinney",
                        "Cody Fisher"
                      ].map((name, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`tag-right-${index}`}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={`tag-right-${index}`}
                            className="flex items-center cursor-pointer"
                          >
                            <div className="w-4 h-4 border-2 border-gray-500 rounded-sm peer-checked:bg-[#5177FF] peer-checked:border-[#5177FF] transition-all"></div>
                            <span className="ml-2 text-white text-sm">
                              {name}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button and Clear Button */}
              <div className="mb-4 flex justify-start space-x-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[250px] h-[54px] p-[10px_8px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none"
                >
                  Submit & Save
                </button>

                {/* Clear Button */}
                <button
                  type="button"
                  className="w-[250px] h-[54px] p-[10px_8px] border border-gray-600 text-white font-bold rounded-lg hover:bg-[#2a3b61] focus:outline-none flex items-center justify-center"
                  onClick={() => {
                    // Clear form logic (You can add any functionality here)
                    console.log("Clear button clicked");
                  }}
                >
                  {/* Recycle Icon (Rounded cancel logo) */}
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 3h-2v4h2V3zm4 1l-1.5 1.5M7 4 5.5 5.5M6 9h12c1.1 0 1.99.9 1.99 2L20 19c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V11c0-1.1.9-2 2-2zm1.5 6l1.5 1.5-4 4-1.5-1.5 4-4z"
                      />
                    </svg>
                  </span>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </SlidingPanel>
      </div>
    </div>
    </div>

  );
}