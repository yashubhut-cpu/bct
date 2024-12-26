"use client";
import { useState } from "react";
import Table from "../component/tablecomponent";
import styles from "../logs&report/styles.module.css";
import {ChevronRight } from "lucide-react";
import columnsConfig from "../columnsConfig";
import Sidebar from "../component/Sidebar/sidebar";

export default function Errornotification() {

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

        <h2
          style={{
            fontSize: "36px",
            marginLeft: "29px",
            color: "#ffffff",
          }}
        >Error Notifications
        </h2>
        <div className={styles.container}>
        
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
    </div>
  );
}
