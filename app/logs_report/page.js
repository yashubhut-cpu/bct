"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { post, get } from "../api/base";
import { formatTime, formatDate } from "../component/FormatDateTime";
import Table from "../component/Table";
import styles from "../logs_report/styles.module.css";
import Sidebar from "../component/Sidebar/sidebar";
import CustomMultiSelect from "../component/CustomMultiSelect";
import DatePicker from "react-datepicker";
import columnsConfig from "../columnsConfig";
import Header from "../component/Header/header";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import "react-datepicker/dist/react-datepicker.css";

export default function Logreport() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [tradeAlerts, setTradeAlerts] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [page, setPage] = useState(1);
  const [alertPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [formValue, setFormValue] = useState({
    startDate: "",
    endDate: "",
    distributionChannel: [],
    segmentation: "",
    group: [],
  });

  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.title = "Logs & Reports";
    if (localStorage.getItem("accessToken")) {
      router.push("/logs_report");
    } else {
      router.push("/");
    }
  }, [router]);

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

  function convertToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const formatDistribution = (distribution) => {
    if (distribution === "sms") {
      return "SMS";
    } else if (distribution === "email") {
      return "Email";
    } else if (distribution === "word_press") {
      return "WordPress";
    }
    return distribution;
  };

  const capitalize = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        ...filterState,
        page,
        page_size: alertPerPage,
      };

      const alerts = await post(
        "/input_trade_alert/get_input_trade_alert/",
        payload
      );

      const formattedAlerts = alerts?.data?.input_trade.map((alert) => ({
        ...alert,
        date_time: `${formatDate(alert?.created_at)}, ${formatTime(
          alert?.created_at
        )}`,
        trade_details: `${
          alert?.ticker_symbol ? alert.ticker_symbol.toUpperCase() : ""
        }, $${Math.round(Number.parseFloat(alert?.entry_price))}/$${Math.round(
          Number.parseFloat(alert?.exit_price)
        )}`,
        distribution_channel: `${(
          alert?.distribution?.map((dist) => formatDistribution(dist)) || []
        ).join(", ")}`,
        group_name: alert?.groups.map((group) => group.group_name).join(", "),
        editor_name: `${capitalize(alert?.created_by?.first_name)} ${capitalize(
          alert?.created_by?.last_name
        )}`,
      }));

      setTradeAlerts(formattedAlerts);
      setTotalPages(alerts?.data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [filterState, page, alertPerPage]); // Added dependencies

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]); // Now fetchAlerts is stable

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFiltered = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newFilterState = {
      page: 1,
      page_size: alertPerPage,
    };

    if (formValue.startDate) {
      newFilterState.from_date = convertToYYYYMMDD(formValue.startDate);
    }

    if (formValue.endDate) {
      newFilterState.to_date = convertToYYYYMMDD(formValue.endDate);
    }

    if (formValue.distributionChannel?.length) {
      newFilterState.distribution = formValue.distributionChannel;
    }

    if (formValue.segmentation?.trim()) {
      newFilterState.segmentation_criteria = formValue.segmentation;
    }

    if (formValue.group?.length) {
      newFilterState.groups = formValue.group;
    }

    setFilterState(newFilterState);
    setPage(1);
  };

  useEffect(() => {
    fetchAlerts();
  }, [page, alertPerPage, fetchAlerts, filterState]);

  const handleEyeClick = (id) => {
    if (id) {
      router.push(`/error_notification?id=${id}`);
    }
  };

  const fetchGroups = useCallback(async () => {
    let apiURL = "";

    if (formValue.segmentation === "keap") {
      apiURL = "/group_management/groups_list_by_platform/keap/";
    } else if (formValue.segmentation === "go_high_level") {
      apiURL = "/group_management/groups_list_by_platform/go_high_level/";
    } else {
      setGroups([]);
      return;
    }

    try {
      const response = await get(apiURL);
      console.log("response", response);
      if (response.status === 200) {
        setGroups(
          response?.data?.map((group) => ({
            label: group.group_name,
            value: group.id,
          })) || []
        );
      } else {
        throw new Error("Error fetching groups");
      }
    } catch (error) {
      setGroups([]);
    }
  }, [formValue.segmentation]); // Add dependencies to keep it stable

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle individual row checkbox change
  const handleRowChange = (id) => {
    const updatedSelectedRows = new Set(selectedRows);
    if (updatedSelectedRows.has(id)) {
      updatedSelectedRows.delete(id); // Deselect the row
    } else {
      updatedSelectedRows.add(id); // Select the row
    }
    setSelectedRows(updatedSelectedRows);

    // Update "Select All" state
    setIsAllSelected(updatedSelectedRows.size === alerts.length);

    // Log the individual row checkbox change
    console.log(`Row ${id} checkbox toggled:`, updatedSelectedRows.has(id));
    console.log("Updated selectedRows:", updatedSelectedRows);
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    const newCheckedState = !isAllSelected;
    setIsAllSelected(newCheckedState);

    if (newCheckedState) {
      // Select all rows across all pages
      const allRowIds = alerts.map((alert) => alert.id);
      setSelectedRows(new Set(allRowIds));
    } else {
      // Deselect all rows
      setSelectedRows(new Set());
    }

    // Log the "Select All" action
    console.log("Select All:", newCheckedState);
    console.log(
      "Updated selectedRows:",
      newCheckedState ? new Set(alerts.map((alert) => alert.id)) : new Set()
    );
  };

  // Handle PDF download for selected rows
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Name", "Description"]; // Adjust columns as needed
    const tableRows = [];

    // Log the selected rows before generating the PDF
    const selectedAlerts = alerts.filter((alert) => selectedRows.has(alert.id));
    console.log("Selected Rows for PDF:", selectedAlerts);

    // Add only selected rows to the PDF
    selectedAlerts.forEach((alert) => {
      const rowData = [
        alert.id,
        alert.name,
        alert.description,
        // Add more fields as needed
      ];
      tableRows.push(rowData);
    });

    // Generate the PDF table
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("selected_rows.pdf");
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        isCollapsed={isSidebarActive}
        toggleSidebar={toggleSidebar}
        isMobileActive={isMobileSidebarActive}
        closeSidebar={toggleMobileSidebar}
      />

      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${
          isSidebarActive ? styles.mainContent : styles.sidebarActive
        }`}
      >
        <div className={styles.pageContent}>
          <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
              Logs & Reports
            </h2>

            <div className="relative inline-block text-left" ref={dropdownRef}>
              {/* Button to toggle dropdown */}
              <button
                type="button"
                className={
                  styles.pageButton +
                  " inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#5177FF ] px-5 py-2 text-sm text-white shadow-sm"
                }
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <img
                  src="/images/export_icon.svg"
                  alt="Export"
                  className="w-4 h-4 me-1"
                />
                Export Data
              </button>

              {/* Export Menu */}
              {isOpen && (
                <div
                  className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      onClick={handleDownloadPDF}
                    >
                      Download PDF
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      Download Excel
                    </button>
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
            <form
              onSubmit={handleFiltered}
              className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-lg"
            >
              {/* Date Pickers */}
              <div className="flex flex-wrap">
                <div className="relative my-2">
                  <DatePicker
                    selected={formValue.startDate}
                    onChange={(date) =>
                      setFormValue({ ...formValue, startDate: date })
                    }
                    placeholderText="dd/mm/yyyy"
                    className="w-full px-4 py-2 z-100 text-sm bg-[#00000000] text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <img
                      src="/images/calendar_icon.svg"
                      alt="Calendar Icon"
                      className="w-4 h-4"
                    />
                  </span>
                </div>

                <div className="relative my-2 ml-0 sm:ml-4">
                  <DatePicker
                    selected={formValue.endDate}
                    onChange={(date) =>
                      setFormValue({ ...formValue, endDate: date })
                    }
                    placeholderText="dd/mm/yyyy"
                    className="w-full px-4 py-2 text-sm bg-[#00000000] text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <img
                      src="/images/calendar_icon.svg"
                      alt="Calendar Icon"
                      className="w-4 h-4"
                    />
                  </span>
                </div>
              </div>

              {/* Dropdowns */}
              <div className="flex flex-wrap gap-4 md:z-30">
                {/* Distribution Channel */}
                <CustomMultiSelect
                  options={[
                    { label: "SMS", value: "sms" },
                    { label: "Email", value: "email" },
                    { label: "WordPress", value: "word_press" },
                  ]}
                  onChange={(selectedValues) =>
                    setFormValue({
                      ...formValue,
                      distributionChannel: selectedValues,
                    })
                  }
                  value={formValue.distributionChannel}
                  placeholder="Distribution Channel"
                  selectedValues={formValue.distributionChannel}
                  isMulti
                />

                {/* Segmentation Criteria */}
                <CustomMultiSelect
                  options={[
                    { label: "Keap", value: "keap" },
                    { label: "Go High Level", value: "go_high_level" },
                  ]}
                  value={formValue.segmentation}
                  placeholder="Segmentation Criteria"
                  onChange={(selectedValues) =>
                    setFormValue({ ...formValue, segmentation: selectedValues })
                  }
                  selectedValues={formValue.segmentation}
                />

                {/* Group */}
                <CustomMultiSelect
                  options={groups}
                  placeholder="Select Groups"
                  value={formValue.group}
                  onChange={(selectedValues) =>
                    setFormValue({ ...formValue, group: selectedValues })
                  }
                  isMulti
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {/* search btn */}
                <button className="flex items-center justify-center w-10 h-10 bg-[#5177FF] text-white rounded-lg focus:ring-2 focus:ring-blue-500">
                  <Search className="w-5 h-5" />
                </button>

                {/* refresh btn */}
                <button
                  className="flex items-center justify-center w-10 h-10 bg-[#00000000] text-gray-400 border border-gray-500 rounded-lg focus:ring-2 focus:ring-gray-500"
                  onClick={() => {
                    setFormValue({
                      startDate: "",
                      endDate: "",
                      distributionChannel: [],
                      segmentation: "",
                      group: [],
                    });
                    fetchAlerts();
                  }}
                >
                  <img
                    src="/images/clear_logo.svg"
                    alt="Clear Logo"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </form>

            {/* Table Section */}
            <div className={styles.tableSection}>
              <div
                className={styles.tableContainer + " scrollbar"}
                id="style-2"
              >
                <div
                  className={styles.tableContent + " force-overflow p-4 pt-0"}
                >
                  <Table
                    alerts={tradeAlerts}
                    visibleColumns={columnsConfig.logreport}
                    loading={loading}
                    onEyeIconClick={handleEyeClick}
                    onRowChange={handleRowChange}
                    onSelectAll={handleSelectAll}
                    isAllSelected={isAllSelected}
                    selectedRows={selectedRows}
                  />
                </div>
              </div>
            </div>

            {/* Pagination Section */}
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
  );
}
