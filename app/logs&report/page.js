"use client";

import Table from '../component/tablecomponent';
import styles from '../logs&report/styles.module.css';
import { ChevronDown, Search, ChevronRight } from 'lucide-react';
import columnsConfig from "../columnsConfig";
import Sidebar from "../component/Sidebar/sidebar";
import { useState } from 'react';


export default function Logreport() {
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
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
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
        <button className={styles.pageButton} onClick={togglePanel}>
          <img src="/images/export_icon.svg" alt="Add Group Icon" />
         Export Data
          </button> 
        <h2
          style={{
            fontSize: "36px",
            marginLeft: "29px",
            color: "#ffffff", // Corrected from "fontcolor"
          }}
        >
          Log & Report
        </h2>   
          
      
        <div className={styles.container}>

        
          {/* Header Section */}
          <div className={styles.header}>

            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className={styles.inputField}
            />
            <select className={styles.selectField}>
              <option value="">Distribution Channel</option>
            </select>
            <select className={styles.selectField}>
              <option value="">Select Group</option>
            </select>
            <select className={styles.selectField}>
              <option value="">Segmentation</option>
            </select>
            <button className={`${styles.actionButton} ${styles.active}`}>
              <Search className="w-4 h-4" />
            </button>
            <button className={styles.actionButton}>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Table Component */}
          {/* Table Section */}
          <div className={styles.tableSection}>
            <div className={styles.tableContainer}>
              <div className={styles.tableContent}>
                <Table alerts={alerts} visibleColumns={columnsConfig.logreport} />
              </div>
            </div>
          </div>

          {/* Pagination Section */}
          <div className={styles.pagination}>
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


