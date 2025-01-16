"use client";

import Table from '../component/tablecomponent';
import styles from '../logs&report/styles.module.css';
import { Search, ChevronRight } from 'lucide-react';
import columnsConfig from "../columnsConfig";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Sidebar from "../component/sidebar/sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from "../component/Header/header";


const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}





export default function Logreport() {

  const [isSidebarActive, setIsSidebarActive] = useState(false);
const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);


// Toggle the sidebar collapse state
const toggleSidebar = () => {
  setIsSidebarActive(!isSidebarActive); // Toggle the state
}

const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);


  const alerts = [
    {
      date_time: "03/10/2024 8:45pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Market Mavericks, Trading Titans, Equity Edge",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:45pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Trading Titans, Equity Edge, Bullish Breakouts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:40pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Equity Edge, Bullish Breakouts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:35pm",
      trade_details: "NVDA, $145/$165",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Stock Savvy Alerts, Securities Spotlight",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:25pm",
      trade_details: "MSFT, $420/$450",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Bullish Breakouts, Stock Savvy Alerts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:20pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS",
      groupName: "The Alert Authority, Bullish Breakouts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:15pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Securities Spotlight, Momentum Masters",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:10pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS",
      groupName: "Profit Pioneers, Stock Savvy Alerts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:05pm",
      trade_details: "NVDA, $145/$165",
      distribution_channel: "Email, SMS",
      groupName: "Chart Chasers, Bullish Breakouts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:55pm",
      trade_details: "MSFT, $420/$450",
      distribution_channel: "SMS, WordPress",
      groupName: "Trade Trailblazers, Securities Spotlight",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:50pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Momentum Masters, Momentum Masters",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:45pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Investment Insights Hub",
      editor_name: "ID154798208585",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:40pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "The Alert Network, Bullish Breakouts",
      editor_name: "ID154798208585",
      action: "edit_delete"
    }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };


  const router = useRouter(); // Initialize the router

  useEffect(() => {
    document.title = "Logs & Reports";
    
  }, [router]);



  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
      {/* Conditionally applying the class for main content */}
      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
      >
        <div className={styles.pageContent}>
        <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
              Logs & Reports
            </h2>



            <div className="relative inline-block text-left">
              {/* Button to toggle dropdown */}
              <div>

                <button
                  type="button"
                  className={styles.pageButton + " inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#5177FF ] px-5 py-2 text-sm text-white shadow-sm"}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <img src="/images/export_icon.svg" alt="Arrow Down" className="w-4 h-4 me-1" />
                  Export Data
                </button>
              </div>

              {/* Dropdown menu */}
              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                      onClick={() => setIsOpen(false)}
                    >
                      Download PDF
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                      onClick={() => setIsOpen(false)}

                    >
                      Download Excel
                    </a>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>





        {/* Table Content */}
        <div className="mx-2 mb-4">
          <div className="bg-[#1C2546] py-4 rounded-[20px] shadow">
            {/* Header Section */}
            <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4  p-4 rounded-lg">
              {/* Date Pickers */}
              <div className="flex space-x-4">
                <div className="relative my-2">
                  <DatePicker
                    select={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="dd/mm/yyyy"
                    className="w-full px-4 py-2 text-sm bg-[#00000000] text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <img src="/images/calendar_icon.svg" alt="Calendar Icon" className="w-4 h-4" />
                  </span>
                </div>

                <div className="relative my-2">
                  <DatePicker
                    select={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="dd/mm/yyyy"
                    className="w-full px-4 py-2 text-sm bg-[#00000000] text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <img src="/images/calendar_icon.svg" alt="Calendar Icon" className="w-4 h-4" />
                  </span>
                </div>
              </div>




              {/* Dropdowns */}
              <div className="flex flex-wrap gap-2">
                <select className="w-full md:w-auto px-4 py-2 text-sm bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Distribution Channel</option>
                </select>

                <select className="w-full md:w-auto px-4 py-2 text-sm bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select Group</option>
                </select>

                <select className="w-full md:w-auto px-4 py-2 text-sm bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Segmentation</option>
                </select>
              </div>






              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex items-center justify-center w-10 h-10 bg-[#5177FF] text-white rounded-lg focus:ring-2 focus:ring-blue-500">
                  <Search className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg focus:ring-2 focus:ring-gray-500">
                  <img src="/images/clear_logo.svg" alt="Clear Logo" className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className={styles.tableSection}>
              <div className={styles.tableContainer + " scrollbar"} id="style-2">
                <div className={styles.tableContent + " force-overflow p-4 pt-0"}>
                  <Table
                    alerts={alerts}
                    visibleColumns={columnsConfig.logreport}
                  />
                </div>
              </div>
            </div>
            {/* <Table alerts={alerts} visibleColumns={columnsConfig.groupmanagement} /> */}
            {/* Pagination Section */}
            <div className={styles.pagination + " justify-between p-4"}>
              <button className={`${styles.paginationButton} ${styles.active}`}>1</button>
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
    </div>


  );
};


