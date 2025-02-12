"use client";
import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar/sidebar";
import Table from "../component/Table";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import columnsConfig from "../columnsConfig";
import styles from "../dashboard/dashboard.module.css";
import Header from "../component/Header/header";
import dynamic from "next/dynamic";
import YearSelector from "./YearSelector";
import WeekSelector from "./WeekSelector";
import { useRouter } from "next/navigation";
import ProtectedPage from "../ProtectedPage";
import { get, post } from "../api/base";
import { formatDate, formatTime } from "../component/FormatDateTime";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Loading from "../component/loading";
// Dynamically import MyChartComponent with SSR disabled
const MyMonthlyChartComponent = dynamic(
  () => import("../component/monthly_chart/chart.js"),
  {
    ssr: false,
  }
);
const MyWeeklyChartComponent = dynamic(
  () => import("../component/weekly_chart/chart.js"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [monthlyAlerts, setMonthlyAlerts] = useState([]);
  const [weeklyAlerts, setWeeklyAlerts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState("current_week");
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertPerPage] = useState(10);
  const [engagementInsights, setEngagementInsights] = useState({
    totalAlertsSent: 0,
    subscribersSegmented: 0,
    recentAlerts: 0,
    userGroups: 0,
  });
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard";
    if (localStorage.getItem("accessToken")) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [router]);

  // Fetch engagement insights data
  useEffect(() => {
    const fetchEngagementInsights = async () => {
      try {
        const response = await get("/dashboard/engagement_insights/");
        if (response.data) {
          setEngagementInsights({
            ...engagementInsights,
            totalAlertsSent: response.data.total_alerts_sent_count || 0,
            subscribersSegmented:
              response.data.subscribers_segmented_count || 0,
            recentAlerts: response.data.recent_alerts_count || 0,
            userGroups: response.data.user_groups_count || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching engagement insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagementInsights();
  }, [engagementInsights]);

  // Fetch monthly alerts data when the selected year changes
  useEffect(() => {
    const fetchMonthlyAlerts = async () => {
      setLoading(true);
      try {
        const response = await get(
          `/dashboard/monthly_alerts/${selectedYear}/`
        );
        if (response.data) {
          setMonthlyAlerts(response.data);
        }
      } catch (error) {
        console.error("Error fetching monthly alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyAlerts();
  }, [selectedYear]);

  // Fetch weekly alerts data when the selected week changes
  useEffect(() => {
    const fetchWeeklyAlerts = async () => {
      setLoading(true);
      try {
        const response = await get(
          `/dashboard/weekday_alerts/${selectedWeek}/`
        );
        if (response.data) {
          setWeeklyAlerts(response.data);
        }
      } catch (error) {
        console.error("Error fetching weekly alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeeklyAlerts();
  }, [selectedWeek]);

  useEffect(() => {
    const fetchRecentTradeAlerts = async () => {
      setLoading(true);
      try {
        const response = await post(
          "/input_trade_alert/get_input_trade_alert/"
        );

        if (
          response.data &&
          response.data.input_trade &&
          Array.isArray(response.data.input_trade)
        ) {
          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);

          const filteredAlerts = response.data.input_trade
            .filter((alert) => new Date(alert.updated_at) >= oneDayAgo)
            .map((alert) => ({
              ...alert,
              title: alert.trade_title || "",
              description: alert.error_description || "",
              ticker: alert.ticker_symbol || "",
              entryPrice:
                `$${Math.round(Number.parseFloat(alert?.entry_price))}` || "",
              exitPrice:
                `$${Math.round(Number.parseFloat(alert?.exit_price))}` || "",
              date_time: `${formatDate(alert?.updated_at)}, ${formatTime(
                alert?.updated_at
              )}`,
            }));

          setRecentAlerts(filteredAlerts);
          setTotalPages(Math.ceil(filteredAlerts.length / alertPerPage));
        } else {
          console.error(
            "Unexpected response format for trade alerts:",
            response.data
          );
          setRecentAlerts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching recent trade alerts:", error);
        setRecentAlerts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTradeAlerts();
  }, [alertPerPage]);

  const paginatedAlerts = recentAlerts.slice(
    (page - 1) * alertPerPage,
    page * alertPerPage
  );

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    localStorage.setItem("isSidebarActive", !isSidebarActive);
  };

  useEffect(() => {
    const isSidebarActive = localStorage.getItem("isSidebarActive");
    if (isSidebarActive === "true") {
      localStorage.setItem("isSidebarActive", true);
      setIsSidebarActive(true);
    } else {
      localStorage.setItem("isSidebarActive", false);
      setIsSidebarActive(false);
    }
  }, []);

  const toggleMobileSidebar = () =>
    setIsMobileSidebarActive(!isMobileSidebarActive);

  // Handle year selection change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(recentAlerts.length / alertPerPage));
  }, [recentAlerts, alertPerPage]);

  // Handle week selection change
  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  const handleEyeClick = (id) => {
    if (id) {
      router.push(`/errornotification?id=${id}`);
    }
  };

  return (
    <ProtectedPage>
      <div className={styles.dashboardContainer}>
        <Sidebar
          isCollapsed={isSidebarActive}
          toggleSidebar={toggleSidebar}
          isMobileActive={isMobileSidebarActive}
          closeSidebar={toggleMobileSidebar}
        />
        {/* Conditionally applying the class for main content */}
        <Header toggleSidebar={toggleMobileSidebar} />
        <div
          className={`${
            isSidebarActive ? styles.mainContent : styles.sidebarActive
          }`}
        >
          <div className={styles.pageContent}>
            <div className={styles.mainDashboard}>
              <h1 className={styles.dashboardTitle}>Dashboard</h1>

              {/* Stats Section */}
              <div
                className={
                  styles.statsContainer +
                  " grid xl:grid-cols-4 md:grid-cols-2 mb-6"
                }
              >
                {/* Stats Cards */}
                <div className={styles.statsCard}>
                  <div className={`${styles.iconContainer} ${styles.blueIcon}`}>
                    <img src="images/total_alert.svg" alt="Total Alerts" />
                  </div>
                  <div className={styles.statsText}>
                    <span className={styles.statsLabel}>Total Alerts Sent</span>
                    <span className={styles.statsValue}>
                      {loading
                        ? "Loading..."
                        : engagementInsights.totalAlertsSent}
                    </span>
                  </div>
                </div>

                <div className={styles.statsCard}>
                  <div
                    className={`${styles.iconContainer} ${styles.orangeIcon}`}
                  >
                    <img
                      src="images/SubscribersSegmented.svg"
                      alt="Total Alerts"
                    />
                  </div>
                  <div className={styles.statsText}>
                    <span className={styles.statsLabel}>
                      Subscribers Segmented
                    </span>
                    <span className={styles.statsValue}>
                      {loading
                        ? "Loading..."
                        : engagementInsights.subscribersSegmented}
                    </span>
                  </div>
                </div>

                <div className={styles.statsCard}>
                  <div
                    className={`${styles.iconContainer} ${styles.greenIcon}`}
                  >
                    <img src="images/RecentAlerts.svg" alt="Total Alerts" />
                  </div>
                  <div className={styles.statsText}>
                    <span className={styles.statsLabel}>Recent Alerts</span>
                    <div className={styles.statsValueContainer}>
                      <span className={styles.statsValue}>
                        {loading
                          ? "Loading..."
                          : engagementInsights.recentAlerts}
                      </span>
                      <span className={styles.tooltipContainer}>
                        <BsFillInfoCircleFill className={styles.infoIcon} />
                        <span className={styles.tooltipText}>
                          Recent alerts show the last 1 hour.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.statsCard}>
                  <div className={`${styles.iconContainer} ${styles.redIcon}`}>
                    <img src="images/UserGroups.svg" alt="Total Alerts" />
                  </div>
                  <div className={styles.statsText}>
                    <span className={styles.statsLabel}>User Groups</span>
                    <span className={styles.statsValue}>
                      {loading ? "Loading..." : engagementInsights.userGroups}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.chartsContainer +
                  " grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto"
                }
              >
                <div
                  className={styles.chart + " w-full h-[450px] overflow-hidden"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={styles.chartTitle}>Monthly Alerts</h2>
                    <YearSelector
                      selectedYear={selectedYear}
                      onYearChange={handleYearChange}
                    />
                  </div>
                  <div className="h-[350px] relative">
                    {loading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loading />
                      </div>
                    ) : (
                      <MyMonthlyChartComponent
                        selectedYear={selectedYear}
                        data={monthlyAlerts}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={styles.chart + " w-full h-[450px] overflow-hidden"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={styles.chartTitle}>Weekly Alerts</h2>
                    <WeekSelector
                      selectedWeek={selectedWeek}
                      onWeekChange={handleWeekChange}
                    />
                  </div>
                  <div className="h-[350px] relative">
                    {loading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loading />
                      </div>
                    ) : (
                      <MyWeeklyChartComponent
                        selectedWeek={selectedWeek}
                        data={weeklyAlerts}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className={styles.tableSection}>
                <div className={styles.tableContainer}>
                  <h2 className={styles.tableTitle}>Recent Alerts</h2>

                  {/* table */}
                  <div className={styles.tableContent}>
                    <Table
                      alerts={paginatedAlerts}
                      visibleColumns={columnsConfig.dashboard}
                      onEyeClick={handleEyeClick}
                      loading={loading}
                    />
                  </div>

                  {/* pagination section */}
                  <div className={styles.pagination + " p-4"}>
                    <button
                      className={styles.paginationButton}
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`${styles.paginationButton} ${
                          page === index + 1 ? styles.active : ""
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className={styles.paginationButton}
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
