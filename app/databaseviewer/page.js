"use client";

import { useState } from "react";
import Table from "../component/tablecomponent";
import styles from "../databaseviewer/styles.module.css";
import { ChevronDown, Search, ChevronRight } from "lucide-react";
import columnsConfig from "../columnsConfig";
import Sidebar from "../component/Sidebar/sidebar";

export default function Databaseviewer() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  const alerts = [
    {
      date_time: "03/10/2024 8:50pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Market Mavericks",
      editor_name: "ID154798208585",
      subscriber: "Brooklyn Simmons",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:45pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Trading Titans",
      editor_name: "ID154798208585",
      subscriber: "Arlene McCoy",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:40pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS",
      groupName: "Equity Edge",
      editor_name: "ID154798208585",
      subscriber: "Leilani Alexander",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:35pm",
      trade_details: "NVDA, $145/$165",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Stock Savvy Alerts",
      editor_name: "ID154798208585",
      subscriber: "Dianne Russell",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:25pm",
      trade_details: "MSFT, $420/$450",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Bullish Breakouts",
      editor_name: "ID154798208585",
      subscriber: "Floyd Miles",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:20pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS",
      groupName: "The Alert Authority",
      editor_name: "ID154798208585",
      subscriber: "Marvin McKinney",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:15pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Securities Spotlight",
      editor_name: "ID154798208585",
      subscriber: "Kristin Watson",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:10pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS",
      groupName: "Profit Pioneers",
      editor_name: "ID154798208585",
      subscriber: "Theresa Webb",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 8:05pm",
      trade_details: "NVDA, $145/$165",
      distribution_channel: "Email, SMS",
      groupName: "Chart Chasers",
      editor_name: "ID154798208585",
      subscriber: "Jane Cooper",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:55pm",
      trade_details: "MSFT, $420/$450",
      distribution_channel: "SMS, WordPress",
      groupName: "Trade Trailblazers",
      editor_name: "ID154798208585",
      subscriber: "Jacob Jones",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:50pm",
      trade_details: "META, $550/$580",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Momentum Masters",
      editor_name: "ID154798208585",
      subscriber: "Cameron Williamson",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:45pm",
      trade_details: "GOOG, $175/$180",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "Investment Insights Hub",
      editor_name: "ID154798208585",
      subscriber: "Annette Black",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:40pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS, WordPress",
      groupName: "The Alert Network",
      editor_name: "ID154798208585",
      subscriber: "Darl Stewart",
      action: "edit_delete"
    },
    {
      date_time: "03/10/2024 7:40pm",
      trade_details: "AMZN, $205/$230",
      distribution_channel: "Email, SMS",
      groupName: "The Alert Network",
      editor_name: "ID154798208585",
      subscriber: "Savannah Nguyen",
      action: "edit_delete"
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

        {/* Export Data Button and Dropdown */}
        <div  className={styles.exportSection} style={{ position: 'relative' }}>
          <button className={styles.pageButton} onClick={togglePanel}>
            <img src="/images/export_icon.svg" alt="Export Data Icon" />
            Export Data
          </button>

          {isPanelOpen && (
            <div
              style={{
                width: 200,
                height: 98,
                background: "white",
                borderRadius: 10,
                position: "absolute",
                right: 10,     // Align dropdown with the button
                marginTop: 50, // Space between button and dropdown
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  color: "#13182C",
                  fontSize: 14,
                  fontFamily: "Be Vietnam Pro",
                  fontWeight: "400",
                  lineHeight: "24px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                }}
                onClick={() => alert("Download PDF clicked")}
              >
                Download PDF
              </div>
              <div
                style={{
                  color: "#13182C",
                  fontSize: 14,
                  fontFamily: "Be Vietnam Pro",
                  fontWeight: "400",
                  lineHeight: "24px",
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                onClick={() => alert("Download Excel clicked")}
              >
                Download Excel
              </div>
            </div>
          )}
        </div>

        <h2
          style={{
            fontSize: "36px",
            marginLeft: "29px",
            color: "#ffffff",
          }}
        >
          Database Viewer
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
            <button className={`${styles.actionButton} ${styles.active}`}>
              <Search className="w-4 h-4" />
            </button>
            <button className={styles.actionButton}>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Table Section */}
          <div className={styles.tableSection}>
            <div className={styles.tableContainer}>
              <div className={styles.tableContent}>
                <Table alerts={alerts} visibleColumns={columnsConfig.database} />
              </div>
            </div>
          </div>

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
  );
}
