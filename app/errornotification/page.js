"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

import Table from "../component/Table";
import Sidebar from "../component/Sidebar/sidebar";
import Header from "../component/Header/header";
import styles from "../errornotification/styles.module.css";
import { formatDate, formatTime } from "../component/FormatDateTime";
import columnsConfig from "../columnsConfig";
import "@fontsource/be-vietnam-pro";
import { get } from "../api/base";

function ErrorNotificationContent() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [errorDetails, setErrorDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [alertPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const transformPayload = (apiResponse) => {
    const notificationType = (type) =>
      ({
        sms: "SMS",
        email: "Email",
        word_press: "WordPress",
      }[type] || type);

    const capitalize = (name) =>
      name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";

    return apiResponse.notification_event.map((event) => {
      let affectedChannel = `${capitalize(event.platform_name) || ""} | ${
        notificationType(event.notification_type) || ""
      }`;

      if (event.notification_type === "sms" && event.contact_phone_numbers) {
        affectedChannel += ` | ${event.contact_phone_numbers}`;
      } else if (
        event.notification_type === "email" &&
        event.contact_email_addresses
      ) {
        affectedChannel += ` | ${event.contact_email_addresses}`;
      } else if (event.notification_type === "wordpress") {
        affectedChannel = `${event.platform_name || ""}`;
      }

      return {
        date_time: `${formatDate(event.updated_at)}, ${formatTime(
          event.updated_at
        )}`,
        error_type: event.error_type || "",
        description: event.error_description || "",
        affected_channel: affectedChannel,
        status: event.notification_status || "",
      };
    });
  };

  const fetchErrorDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get(
        `/input_trade_alert/get_input_trade_alert_details/${id}/`,
        {
          page,
          page_size: alertPerPage,
        }
      );

      const transformedData = transformPayload(response.data);
      setErrorDetails(transformedData);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching error details", error);
    } finally {
      setLoading(false);
    }
  }, [id, page, alertPerPage]);

  useEffect(() => {
    document.title = "Error Notification";
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/");
      return;
    }
    fetchErrorDetails();
  }, [fetchErrorDetails, router]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        isCollapsed={isSidebarActive}
        toggleSidebar={() => setIsSidebarActive(!isSidebarActive)}
      />
      <Header
        toggleSidebar={() => setIsMobileSidebarActive(!isMobileSidebarActive)}
      />
      <div
        className={isSidebarActive ? styles.mainContent : styles.sidebarActive}
      >
        <div className={styles.pageContent}>
          <div className="flex justify-between items-center ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl text-white mt-4 mb-3">
              Alert Sent
            </h2>
            <button
              className={`${styles.pageButton} bg-[#5177FF] px-5 py-2 text-white`}
              onClick={() => router.push("/logs-report")}
            >
              <img
                src="/images/back_arrow.svg"
                alt="Back"
                className="w-4 h-4 me-1"
              />
              Back to Logs
            </button>
          </div>

          <div className="mx-2 mb-4">
            <div className="bg-[#1C2546] py-4 rounded-[20px] shadow">
              <div className={styles.tableSection}>
                <div
                  className={`${styles.tableContainer} scrollbar`}
                  id="style-2"
                >
                  <div className={`${styles.tableContent} p-4 pt-0`}>
                    <Table
                      alerts={errorDetails}
                      visibleColumns={columnsConfig.errortype}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Errornotification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorNotificationContent />
    </Suspense>
  );
}
