"use client";
import { useState, useEffect } from "react";
import Table from "../component/Table";
import styles from "../errornotification/styles.module.css";
import { ChevronRight } from "lucide-react";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import columnsConfig from "../columnsConfig";
import Sidebar from "../component/Sidebar/sidebar";
import { useRouter } from "next/navigation";
import Header from "../component/Header/header";


export default function Errornotification() {
  const router = useRouter(); // Initialize the router


  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  }

  const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);


  useEffect(() => {
    document.title = "Error Notification";
    if (localStorage.getItem("accessToken")) {
      router.push('/errornotification')
    } else {
      router.push('/')
    }
  }, [router]);

  const alerts = [{
    date_time: "03/10/2024 8:50pm",
    error_type: "Critical",
    description: "Failed, internal server error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Network Issue",
    description: "Failed, Network error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Analytical",
    description: "Gateway Timeout",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Queued",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Syntax Error",
    description: "Failed, Network error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "In Progress",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Critical",
    description: "Failed, internal server error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Other",
    description: "Non-Authoritative Information",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Network Issue",
    description: "Failed, Network error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Critical",
    description: "Failed, internal server error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Analytical",
    description: "Gateway Timeout",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "In Progress",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Network Issue",
    description: "Failed, Network error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Critical",
    description: "Failed, internal server error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Other",
    description: "Non-Authoritative Information",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Network Issue",
    description: "Failed, Network error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Critical",
    description: "Failed, internal server error",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "Completed",
    action: ["Edit", "Delete"]
  },
  {
    date_time: "03/10/2024 8:50pm",
    error_type: "Analytical",
    description: "Gateway Timeout",
    affected_channel: "Lorem ipsum is simply dummy text of the printing",
    status: "In Progress",
    action: ["Edit", "Delete"]
  }
  ]
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };



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
              Error Notification
          </h2>

          </div>
          <div className="mx-2 mb-4">
            <div className="bg-[#1C2546] pb-4 rounded-[20px] shadow">
              {/* Table Section */}
              <div className={styles.tableSection}>
                <div className={styles.tableContainer + " scrollbar"} id="style-2">
                  <div className={styles.tableContent + " force-overflow p-4 pt-0"}>
                    <Table alerts={alerts} visibleColumns={columnsConfig.errortype} />
                  </div>
                </div>
              </div>

              {/* Pagination Section */}
              <div className={styles.pagination + " p-4"}>
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
    </div>

  );
}
