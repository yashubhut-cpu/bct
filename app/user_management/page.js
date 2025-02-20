"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { del, get, post, put } from "../api/base";
import { useRouter } from "next/navigation";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import styles from "../user_management/styles.module.css";
import Sidebar from "../component/Sidebar/sidebar";
import Table from "../component/Table";
import columnsConfig from "../columnsConfig";
import SlidingPanel from "../component/SlidingPanel";
import Select from "react-select";
import Header from "../component/Header/header";
import ConfirmationDialog from "../component/ConfirmationDialog";
import Popup from "../component/Popup";
import CustomSelect from "../component/CustomSelect";
import Loading from "../component/loading";
export default function Usermanagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Role: "",
    assignedGroups: [],
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Role: "",
    // assignedGroups: "",
  });

  const handleToggle = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    if (editingUser) {
      setActive(editingUser.is_active);
    } else {
      setActive(true);
    }
  }, [editingUser]);
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get("/user_management/user_management_list/", {
        page,
        page_size: itemsPerPage,
      });
      setUsers(response.data?.users);
      setTotalPages(response?.data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage]); // Dependencies

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleGroupChange = (select) => {
    const assignedGroups = select || [];

    setFormValues({
      ...formValues,
      assignedGroups,
    });

    // setErrors({f
    //   ...errors,
    //   assignedGroups:
    //     assignedGroups.length > 0
    //       ? ""
    //       : "At least one editor must be selected.",
    // });
  };

  useEffect(() => {
    setIsPanelOpen(isPanelOpen);
  }, [isPanelOpen]);

  const togglePanel = (rowData = null) => {
    setIsPanelOpen(!isPanelOpen);
    if (rowData) {
      setEditingUser(rowData);
      setFormValues({
        firstName: rowData.first_name,
        lastName: rowData.last_name,
        email: rowData.email,
        Role: rowData.role,
        assignedGroups: rowData.group?.map((group) => ({
          value: group.id,
          label: `${group.group_name}`,
        })),
      });
    } else {
      setEditingUser(null);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        Role: "",
        assignedGroups: [],
      });
    }
  };

  const router = useRouter();

  useEffect(() => {
    document.title = "User Management";
    if (localStorage.getItem("accessToken")) {
      router.push("/user_management");
    } else {
      router.push("/");
    }
  }, [router]);

  const getGroupsList = async () => {
    try {
      const response = await get("/user_management/group_list/");
      const result = response.data.map((group) => ({
        value: group.id,
        label: group.group_name,
      }));
      setGroups(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    getGroupsList();
  }, []);

  const customStyles = {
    clearIndicator: (provided) => ({
      ...provided,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        color: "#ff6b6b",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      border: "1px solid #999",
      padding: "5px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
      marginRight: "5px",
      padding: "3px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff6b6b",
      cursor: "pointer",
      backgroundColor: "transparent",
      borderRadius: "50%",
      border: "1px solid #ff6b6b",
      padding: "3px",
      ":hover": {
        backgroundColor: "#ff6b6b",
        color: "#fff",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1C2546" : "transparent",
      ":hover": {
        backgroundColor: "#2196f3",
        borderRadius: "8px",
        color: "#FFF",
      },
      color: "#FFF",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      color: "#fff",
      border: "1px solid #A3AED0",
      borderRadius: "8px",
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "10px",
      borderRadius: "8px",
      backgroundColor: "transparent",
      color: "#fff",
      borderColor: "rgb(75 85 99)",
      boxShadow: "none",
      padding: "5px 10px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#94A3B8",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log("id", id);
    console.log("value", value);
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
    // Only validate these required fields
    const requiredFields = ["firstName", "lastName", "email", "Role"];
    requiredFields.forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email: formValues.email,
        is_active: active,
        role: formValues.Role,
        group_editors_assignment: formValues.assignedGroups.map(
          (group) => group.value
        ),
      };
      setIsSubmitting(true);
      try {
        let response;
        if (editingUser) {
          response = await put(
            `/user_management/update_user_management/${editingUser.id}/`,
            payload
          );
          setPopup({
            show: true,
            message: "User updated successfully",
            type: "success",
          });
        } else {
          response = await post(
            "/user_management/create_user_management/",
            payload
          );
          setPopup({
            show: true,
            message: "User created successfully",
            type: "success",
          });
        }
        togglePanel();
        fetchUsers();
      } catch (error) {
        console.error("Error creating/updating user:", error);
        if (error.response && error.response.status === 409) {
          setPopup({
            show: true,
            message: "Error: Email is already in use.",
            type: "error",
          });
        } else {
          setPopup({
            show: true,
            message: `Error: ${
              error.response?.data?.message ||
              "An unexpected error occurred, Please try again!!!"
            }`,
            type: "error",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) {
      console.warn("No user selected for deletion");
      return;
    }

    try {
      await del(`/user_management/delete_user_management/${userToDelete}/`);
      console.log("User deleted successfully");
      setPopup({
        show: true,
        message: "User deleted successfully",
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      console.error(
        `Error deleting user with ID ${userToDelete}:`,
        error.response?.data || error.message
      );
      setPopup({
        show: true,
        message: `Error deleting user: ${
          error.response?.data?.message ||
          "An unexpected error occurred, Please try again!!!"
        }`,
        type: "error",
      });
    } finally {
      setUserToDelete(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleEditClick = (id, rowData) => {
    setEditingUser(rowData);
    setFormValues({
      firstName: rowData.first_name,
      lastName: rowData.last_name,
      email: rowData.email,
      Role: rowData.role,
      assignedGroups: rowData.group.map((g) => ({
        value: g.group.id,
        label: `${g.group.group_name}`,
      })),
    });
    setIsPanelOpen(true);
  };

  const handlePasswordReset = async (id) => {
    try {
      const response = await put(
        `/user_management/change_password_request/${id}/`
      );
      setPopup({
        show: true,
        message: "Password reset request sent successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      setPopup({
        show: true,
        message: `Error: ${
          error.response?.data?.message ||
          "An unexpected error occurred while resetting the password."
        }`,
        type: "error",
      });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        isCollapsed={isSidebarActive}
        toggleSidebar={toggleSidebar}
        isMobileActive={isMobileSidebarActive}
      />
      {/* Conditionally applying the class for main content */}
      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${
          isSidebarActive ? styles.mainContent : styles.sidebarActive
        }`}
      >
        <div className={styles.pageContent}>
          {/* Group Management Section */}
          <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
              User Management
            </h2>
            <button className={styles.pageButton} onClick={() => togglePanel()}>
              <img src="/images/add_user.svg" alt="Add Group Icon" />
              Add New User
            </button>
          </div>

          {/* Table Content */}
          <div className="mx-2 mb-4">
            <div className="bg-[#1C2546] rounded-[20px] shadow relative">
              <div className={styles.tableSection}>
                <div
                  className={styles.tableContainer + " scrollbar"}
                  id="style-2"
                >
                  <div
                    className={styles.tableContent + " force-overflow p-4 pt-0"}
                  >
                    <Table
                      alerts={users}
                      visibleColumns={columnsConfig.usermanagement}
                      onEditClick={handleEditClick}
                      onDeleteClick={handleDeleteClick}
                      onPasswordResetClick={handlePasswordReset}
                      loading={loading}
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

        {/* Sliding Panel */}
        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={togglePanel}
          width="w-[700px]"
          style={{
            height: "685px",
            top: "0px",
            left: "998px",
            gap: "20px",

            opacity: isPanelOpen ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {/* Header Text */}
          <div className="p-4 pb-0 force-overflow">
            <h2 className="text-white text-[36px]">Add/Edit User</h2>
          </div>
          {/* Form Content */}
          <div className="p-6 bg-[#1C2546] text-white rounded-b-lg">
            <form onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-white text-sm font-medium mb-2"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>

              {/* Last Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  placeholder="You're email goes here"
                  type="text"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.email}
                  onChange={handleInputChange}
                ></input>
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              {/* User Role Field */}
              <div className="mb-4">
                <label
                  htmlFor="Role"
                  className="block text-white text-sm font-medium mb-2"
                >
                  User Role <span className="text-red-500">*</span>
                </label>

                <CustomSelect
                  id="Role"
                  value={formValues.Role}
                  options={[
                    { value: "editor", label: "Editor" },
                    { value: "admin", label: "Admin" },
                  ]}
                  onChange={(newRole) =>
                    handleInputChange({
                      target: { id: "Role", value: newRole },
                    })
                  }
                  placeholder="Select User Role"
                />
                {errors.Role && (
                  <span className={styles.error}>{errors.Role}</span>
                )}
              </div>

              <div className={styles.field8 + " mb-4"}>
                <label>Assign Groups</label>
                <div className={styles.selectWrapper}>
                  <Select
                    isMulti
                    options={groups}
                    value={formValues.assignedGroups}
                    onChange={handleGroupChange}
                    placeholder="Search and select groups"
                    instanceId="assigned-groups-select"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                  {errors.assignedGroups && (
                    <span className={styles.error}>
                      {errors.assignedGroups}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="status"
                    type="checkbox"
                    className="sr-only peer"
                    checked={active}
                    onChange={handleToggle}
                  />
                  <div className="w-10 h-6 bg-[#000] rounded-full peer peer-checked:bg-[#4E71F3] transition duration-300"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform duration-300"></div>
                </label>
                <span>{active ? "Active" : "Not Active"}</span>

                <span className="text-white font-medium">
                  Status <span className="text-red-500">*</span>
                </span>
              </div>

              <div className="mb-4 flex justify-start space-x-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[250px] h-[54px] p-[10px_8px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loading color={"white"} />
                    </div>
                  ) : editingUser ? (
                    "Update User"
                  ) : (
                    "Submit & Save"
                  )}
                </button>
                {/* Clear Button */}
                <button
                  type="button"
                  className="w-[250px] h-[54px] p-[10px_8px] border border-gray-600 text-white font-bold rounded-lg hover:bg-[#2a3b61] focus:outline-none flex items-center justify-center"
                  onClick={() => {
                    setFormValues({
                      firstName: "",
                      lastName: "",
                      email: "",
                      Role: "",
                      assignedGroups: [],
                    });
                    setErrors({});
                  }}
                  disabled={isSubmitting}
                >
                  {/* Recycle Icon */}
                  <span className="mr-2">
                    <img src="/images/clear_logo.svg" alt="Recycle Icon" />
                  </span>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </SlidingPanel>

        <ConfirmationDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />

        {popup.show && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup({ ...popup, show: false })}
          />
        )}
      </div>
    </div>
  );
}
