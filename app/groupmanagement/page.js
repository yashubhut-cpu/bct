"use client";
import { useState, useEffect } from "react";
import React from "react";
import styles from "../groupmanagement/styles.module.css"; // Correctly import the CSS module here
import Sidebar from "../component/Sidebar/sidebar";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Table from "../component/tablecomponent"; // Import the Table component
import columnsConfig from "../columnsConfig"; // Import the columnsConfig
import { ChevronRight, ChevronLeft } from "lucide-react";
import SlidingPanel from "../component/SlidingPanel"; // Import reusable SlidingPanel
import Select from "react-select";
import { useRouter } from 'next/navigation';
import Header from "../component/Header/header";
import { del, get, post, put } from "../api/base";  

export default function Groupmanagement() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to prevent errors
  const [groupData, setGroupData] = useState([]);

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    document.title = "Group Management";
    if (localStorage.getItem("accessToken")) {
      router.push('/groupmanagement')
    } else {
      router.push('/')
    }
  }, [router]);

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  }

  const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const [formValues, setFormValues] = useState({
    groupName: "",
    description: "",
    status: "",
    segmentation: "",
    tagAssigned: "",
    assignedEditors: [],
  });

  const [errors, setErrors] = useState({
    groupName: "",
    description: "",
    status: "",
    segmentation: "",
    tagAssigned: "",
    assignedEditors: "",
  });

  const handleEditorChange = (select) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      assignedEditors: select ? select.map((item) => item.label) : [],
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      assignedEditors:
        select && select.length > 0 ? "" : "At least one editor must be select.",
    }));
  };

  const editorsList = [
    { value: "editor1", label: "Jacob Jones" },
    { value: "editor2", label: "Theresa Webb" },
    { value: "editor3", label: "Arlene McCoy" },
    { value: "editor4", label: "Dianne Russell" },
    { value: "editor5", label: "Albert Flores" },
    { value: "editor6", label: "Ralph Edwards" },
    { value: "editor7", label: "Kathryn Murphy" },
  ];

  const customStyles = {
    clearIndicator: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": {
        color: "#ff6b6b",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
      marginRight: "5px",
      border: "1px solid",
      borderRadius: "5px",
      borderColor: "#999",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff6b6b",
      cursor: "pointer",
      backgroundColor: "transparent",
      borderRadius: "50%",
      border: "1px solid #ff6b6b",
      padding: "5px",
      ":hover": {
        backgroundColor: "#ff6b6b",
        color: "#fff",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1C2546" : "transparent",
      color: "#FFF",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      color: "#fff",
      border: "1px solid #A3AED0",
      borderRadius: "12px",
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "10px",
      borderRadius: "12px",
      backgroundColor: "transparent",
      color: "#fff",
      borderColor: "rgb(75 85 99)",
      boxShadow: "none",
      padding: "5px 10px",
    }),
  };

  const handleInputChange = async (e) => {
    const { id, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : "This field is required.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] || (Array.isArray(formValues[key]) && formValues[key].length === 0)) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        group_name: formValues.groupName,
        description: formValues.description,
        segmentation_criteria: formValues.segmentation,
        tag_id: formValues.tagAssigned,
        editors_group_assignment: formValues.assignedEditors
      };

      console.log("Payload", payload);

      try {
        const response = await post('/group_management/create_group/', payload);
        console.log(response);
      } catch (error) {
        console.error('Error creating group:', error);
      }
      console.log("Form submitted successfully", formValues);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] || (Array.isArray(formValues[key]) && formValues[key].length === 0)) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);

    let id = 'a33299d1-cfab-4f5e-b070-32c69b517dda';

    const payload = {
      group_name: formValues.groupName,
      description: formValues.description,
      segmentation_criteria: formValues.segmentation,
      tag_id: formValues.tagAssigned,
      editors_group_assignment: formValues.assignedEditors
    };

    console.log("Payload", payload);
    try {
      const response = await put(`/group_management/update_group/${id}`, payload);
      console.log(response);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    let id = 'a33299d1-cfab-4f5e-b070-32c69b517dda';

    try {
      const response = await del(`/group_management/delete_group/${id}`, payload);
      console.log(response);
    } catch (error) {
      console.error('Error delete group:', error);
    }

    fetchGroups();
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await get("/group_management/get_group/", { page, page_size: itemsPerPage });
  
        setGroupData(response?.data?.groups);
        setTotalPages(response?.data?.total_pages || 1); 
      } catch (error) {
        console.error("Error fetching groups:", error);
        setTotalPages(1); 
      }
    };
    fetchGroups();
  }, [page,itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  

  console.log(groupData);
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
      >
        <div className={styles.pageContent}>
          {/* Group Management Section */}
          <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
              Group Management
            </h2>
            <button className={styles.pageButton} onClick={togglePanel}>
              <img src="/images/addnewgroup.svg" alt="Add Group Icon" />
              Add New Group
            </button>
          </div>

          {/* Table Content */}
          <div className="mx-2 mb-4">
            <div className="bg-[#1C2546] rounded-[20px] shadow relative">
              <div className={styles.tableSection}>
                <div className={styles.tableContainer + " scrollbar"} id="style-2">
                  <div className={styles.tableContent + " force-overflow p-4 pt-0"}>
                    <Table alerts={groupData} visibleColumns={columnsConfig.groupmanagement} />
                    
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
                    className={`${styles.paginationButton} ${page === index + 1 ? styles.active : ""}`}
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

        {/* Sliding Panel */}
        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={togglePanel}
          width="w-[700px]" // Fixed width 700px
          style={{
            height: "685px", 
            top: "0px", 
            left: "998px", 
            gap: "20px", 
            opacity: isPanelOpen ? 1 : 0, // Opacity toggles based on panel state
            transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
          }}
        >
          {/* Header Text */}
          <div className="p-4 pb-0 force-overflow">
            <h2 className="text-white text-[36px]">Add/Edit Group</h2>
          </div>
          {/* Form Content */}
          <div className="p-6 bg-[#1C2546] text-white rounded-b-lg">
            <form onSubmit={handleSubmit}>
              {/* Group Name Field */}
              <div className="mb-4">
                <label htmlFor="groupName" className="block text-white text-sm font-medium mb-2">
                  Group Name*
                </label>
                <input
                  type="text"
                  id="groupName"
                  placeholder="Enter your group Name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.groupName}
                  onChange={handleInputChange}
                />
                {errors.groupName && <span className={styles.error}>{errors.groupName}</span>}
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-white text-sm font-medium mb-2">
                  Description*
                </label>
                <textarea
                  id="description"
                  placeholder="Group description goes here"
                  rows="4"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.description}
                  onChange={handleInputChange}
                ></textarea>
                {errors.description && <span className={styles.error}>{errors.description}</span>}
              </div>

              {/* Status Field */}
              <div className="mb-4">
                <label htmlFor="status" className="block text-white text-sm font-medium mb-2">
                  Status*
                </label>
                <select
                  id="status"
                  className="w-full p-3 bg-[#1C2546] text-slate-400 rounded-lg border border-gray-600 focus:outline-none"
                  value={formValues.status}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <span className={styles.error}>{errors.status}</span>}
              </div>

              {/* Segmentation Criteria Field */}
              <div className="mb-4">
                <label htmlFor="segmentation" className="block text-white text-sm font-medium mb-2">
                  Segmentation Criteria*
                </label>
                <select
                  id="segmentation"
                  className="w-full p-3 bg-[#1C2546] text-slate-400 rounded-lg border border-gray-600 focus:outline-none"
                  value={formValues.segmentation}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Segmentation Criteria
                  </option>
                  <option value="criteria1">Criteria 1</option>
                  <option value="criteria2">Criteria 2</option>
                  <option value="criteria3">Criteria 3</option>
                </select>
                {errors.segmentation && <span className={styles.error}>{errors.segmentation}</span>}
              </div>

              {/* Tag Assigned Field */}
              <div className="mb-4">
                <label htmlFor="tagAssigned" className="block text-white text-sm font-medium mb-2">
                  Tag Assigned*
                </label>
                <select
                  id="tagAssigned"
                  className="w-full p-3 bg-[#1C2546] text-slate-400 rounded-lg border border-gray-600 focus:outline-none"
                  value={formValues.tagAssigned}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Tags
                  </option>
                  <option value="criteria1">Criteria 1</option>
                  <option value="criteria2">Criteria 2</option>
                  <option value="criteria3">Criteria 3</option>
                </select>
                {errors.tagAssigned && <span className={styles.error}>{errors.tagAssigned}</span>}
              </div>

              {/* Assign Editors Field */}
              <div className={styles.field8}>
                <label>Assign Editors*</label>
                <div className={styles.selectWrapper}>
                  <Select
                    isMulti
                    name="editors"
                    options={editorsList}
                    value={editorsList.filter((option) =>
                      formValues.assignedEditors.includes(option.label)
                    )}
                    onChange={handleEditorChange}
                    placeholder="Search and select editors"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                  {errors.assignedEditors && (
                    <span className={styles.error}>{errors.assignedEditors}</span>
                  )}
                </div>
              </div>

              {/* Submit Button and Clear Button */}
                      <div className="mb-4 mt-4 flex justify-start space-x-4">
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-[250px] h-[54px] p-[10px_8px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none"
                      >
                        Submit & Save
                      </button>

                      {/* Success Message */}
                      {Object.keys(errors).length === 0 && (
                        <span className={styles.successMessage}>Group Saved successfully</span>
                      )}

                      {/* Clear Button */}
                <button
                  type="button"
                  className="w-[250px] h-[54px] p-[10px_8px] border border-gray-600 text-white font-bold rounded-lg hover:bg-[#2a3b61] focus:outline-none flex items-center justify-center"
                  onClick={() => {
                    setFormValues({
                      groupName: "",
                      description: "",
                      status: "",
                      segmentation: "",
                      tagAssigned: "",
                      assignedEditors: [],
                    });
                    setErrors({});
                  }}
                >
                  {/* Recycle Icon (Rounded cancel logo) */}
                  <span className="mr-2">
                    <img src="/images/clear_logo.svg" alt="Recycle Icon" />
                  </span>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </SlidingPanel>
      </div>
    </div>
  );
}
