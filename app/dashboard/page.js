"use client";
import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar/sidebar";
import Table from "../component/Table";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import columnsConfig from "../columnsConfig";
import styles from "../dashboard/dashboard.module.css";
import Header from "../component/Header/header";
import dynamic from 'next/dynamic';
import YearSelector from "./YearSelector";
import { useRouter } from "next/navigation";

// Dynamically import MyChartComponent with SSR disabled
const MyMonthlyChartComponent = dynamic(() => import('../component/monthly_chart/chart.js'), {
  ssr: false
});
const MyWeeklyChartComponent = dynamic(() => import('../component/weekly_chart/chart'), {
  ssr: false
});



export default function Dashboard() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  const router = useRouter(); // Initialize the router

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   if (accessToken) {
  //     document.title = "Dashboard"; // Set document title for authenticated user
  //     router.push('/dashboard'); // Redirect to dashboard
  //   } else {
  //     document.title = "Login"; // Set document title for unauthenticated user
  //     router.push('/'); // Redirect to login
  //   }
  // }, [router]);



  useEffect(() => {
    document.title = "Dashboard" ;
    if (localStorage.getItem("accessToken")) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }

  }, 
  [router]);


  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  }

  const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);


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
    <Sidebar isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
    {/* Conditionally applying the class for main content */}
    <Header toggleSidebar={toggleMobileSidebar} />
    <div
      className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
    >

        <div className={styles.pageContent}>
          <div className={styles.mainDashboard}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>

            <div className={styles.statsContainer + " grid xl:grid-cols-4 md:grid-cols-2 mb-6"}>
              {/* Stats Cards */}
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.blueIcon}`}>
                  <img src="images/total_alert.svg" alt="Total Alerts" />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>Total Alerts Sent</span>
                  <span className={styles.statsValue}>15280</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.orangeIcon}`}>
                  <img src="images/SubscribersSegmented.svg" alt="Total Alerts" />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>
                    Subscribers Segmented
                  </span>
                  <span className={styles.statsValue}>2549</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.greenIcon}`}>
                  <img src="images/RecentAlerts.svg" alt="Total Alerts" />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>Recent Alerts</span>
                  <span className={styles.statsValue}>359</span>
                </div>
              </div>
              <div className={styles.statsCard}>
                <div className={`${styles.iconContainer} ${styles.redIcon}`}>
                  <img src="images/UserGroups.svg" alt="Total Alerts" />
                </div>
                <div className={styles.statsText}>
                  <span className={styles.statsLabel}>User Groups</span>
                  <span className={styles.statsValue}>2180</span>
                </div>
              </div>
            </div>

            <div className={styles.chartsContainer + " grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto"}>
              <div className={styles.chart + " w-full overflow-hidden"}>
                <div className="flex justify-between items-center">
                  <h2 className={styles.chartTitle}>Monthly Alerts</h2>
                  <YearSelector />
                </div>
                {/* <img src="./images/MonthlyAlerts.svg" alt="Chart Image" className={styles.chartImage} /> */}
                <MyMonthlyChartComponent />


              </div>
              <div className={styles.chart + " w-full overflow-hidden"}>
                <div className="flex justify-between items-center">
                  <h2 className={styles.chartTitle}>Weekly Alerts</h2>
                  <YearSelector />
                </div>
                <MyWeeklyChartComponent />
              </div>
            </div>

            {/* Table Section */}
            <div className={styles.tableSection}>
              <div className={styles.tableContainer}>
                <h2 className={styles.tableTitle}>Recent Alerts</h2>
                <div className={styles.tableContent}>
                  <Table
                    alerts={alerts}
                    visibleColumns={columnsConfig.dashboard}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

