"use client"
import { useState } from 'react';
import Sidebar from "../component/Sidebar/sidebar";
import Table from "../component/tablecomponent";
import columnsConfig from "../columnsConfig";
import styles from "../dashboard/dashboard.module.css";
import { Package, Bell, Users } from 'lucide-react';  // Fixed the import

export default function Dashboard() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  };

  const alerts = [
    {
      title: "BUY Meta 550 CE",
      description: "Meta at 550 Level",
      ticker: "META",
      entryPrice: "$350",
      exitPrice: "$380",
      status: "Active",
      date: "18 Nov 2025",
    },
    {
      title: "BUY Alphabet 173 CE",
      description: "Alphabet at 170 Level",
      ticker: "GOOG",
      entryPrice: "$175",
      exitPrice: "$180",
      status: "Active",
      date: "17 Nov 2025",
    },
    {
      title: "BUY Amazon 200 CE",
      description: "Amazon at 200 Level",
      ticker: "AMZN",
      entryPrice: "$205",
      exitPrice: "$230",
      status: "Hold",
      date: "17 Nov 2025",
    },
    {
      title: "BUY NVIDIA 140 CE",
      description: "NVIDIA at 140 Level",
      ticker: "NVDA",
      entryPrice: "$145",
      exitPrice: "$165",
      status: "Not Active",
      date: "16 Nov 2025",
    },
    {
      title: "BUY Microsoft 410 CE",
      description: "Microsoft at 410 Level",
      ticker: "MSFT",
      entryPrice: "$420",
      exitPrice: "$450",
      status: "Active",
      date: "16 Nov 2025",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar}/>
      {/* Conditionally applying the class for main content */}
      <div className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}>
        <div className={styles.pageContent}>
          <div className={styles.mainDashboard}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>

            <div className={styles.statsContainer}>
              {/* Stats Cards */}
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.blueIcon}`}>
                  <Package color="white" size={24} />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>Total Alerts Sent</span>
                  <span className={styles.statsValue}>15280</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.orangeIcon}`}>
                  <Users color="white" size={24} />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>Subscribers Segmented</span>
                  <span className={styles.statsValue}>2549</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.greenIcon}`}>
                  <Bell color="white" size={24} />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>Recent Alerts</span>
                  <span className={styles.statsValue}>359</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.redIcon}`}>
                  <Users color="white" size={24} />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>User Groups</span>
                  <span className={styles.statsValue}>2180</span>
                </div>
              </div>
            </div>

            <div className={styles.chartsContainer}>
              <div className={styles.chart}>
                <h2 className={styles.chartTitle}>Monthly Alerts</h2>
                <img src="./images/MonthlyAlerts.svg" alt="Chart Image" className={styles.chartImage} />
              </div>
              <div className={styles.chart}>
                <h2 className={styles.chartTitle}>Weekly Alerts</h2>
                <img src="./images/WeeklyAlerts.svg" alt="Chart Image" className={styles.chartImage} />
              </div>
            </div>

            {/* Table Section */}
            <div className={styles.tableSection}>
              <div className={styles.tableContainer}>
                <h2 className={styles.tableTitle}>Recent Alerts</h2>
                <div className={styles.tableContent}>
                  <Table alerts={alerts} visibleColumns={columnsConfig.dashboard} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
