"use client";
import { useState, useEffect, useCallback } from "react";
import { del, get, post, put } from "../api/base";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import styles from "./styles.module.css";
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

export default function Groupmanagement() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [groupData, setGroupData] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [tagLoader, setTagLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorsList, setEditorsList] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formValues, setFormValues] = useState({
    groupName: "",
    description: "",
    status: "",
    segmentation: "",
    tagAssigned: [],
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

  const router = useRouter();

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

  useEffect(() => {
    document.title = "Group Management";
    if (localStorage.getItem("accessToken")) {
      router.push("/group_management");
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchTags = async (value) => {
    let apiUrl = "";

    if (value === "keap") {
      apiUrl = "/api_client/keap_tags/";
    } else if (value === "go_high_level") {
      apiUrl = "/api_client/ghl_tags/";
    } else {
      setTags([]);
      return;
    }
    setTagLoader(true);
    try {
      const response = await get(apiUrl);
      if (response.status === 200) {
        const data = await response.data;
        setTags(data.tags);
      } else {
        throw new Error("Failed to fetch tags");
      }
    } catch (error) {
      setTags([]);
    } finally {
      setTagLoader(false);
    }
  };

  useEffect(() => {
    if (editingGroup && editingGroup.segmentation_criteria) {
      fetchTags(editingGroup.segmentation_criteria);
    }
  }, [editingGroup]);

  const togglePanel = (rowData = null) => {
    setIsPanelOpen(!isPanelOpen);
    if (rowData) {
      setEditingGroup(rowData);
      setFormValues({
        groupName: rowData.group_name,
        description: rowData.description,
        status: rowData.is_active ? "active" : "inactive",
        segmentation: rowData.segmentation_criteria,
        tagAssigned: rowData.tags.map((tag) => ({
          value: tag.id,
          label: tag.tag_name,
        })),
        assignedEditors: rowData.editor_assigned_groups.map((editor) => ({
          value: editor.editor.id,
          label: `${editor.editor.first_name} ${editor.editor.last_name}`,
        })),
      });
    } else {
      setEditingGroup(null);
      setFormValues({
        groupName: "",
        description: "",
        status: "",
        segmentation: "",
        tagAssigned: [],
        assignedEditors: [],
      });
    }
  };

  const handleTagsChange = (select) => {
    const tagAssigned = select || [];

    console.log("tagAssigned", tagAssigned);

    setFormValues({
      ...formValues,
      tagAssigned,
    });

    setErrors({
      ...errors,
      tagAssigned:
        tagAssigned.length > 0 ? "" : "At least one tag must be selected.",
    });
  };

  const handleEditorChange = (select) => {
    const assignedEditors = select || [];

    setFormValues({
      ...formValues,
      assignedEditors,
    });

    setErrors({
      ...errors,
      assignedEditors:
        assignedEditors.length > 0
          ? ""
          : "At least one editor must be selected.",
    });
  };

  const getEditorsList = async () => {
    try {
      const response = await get("/group_management/editor_list/");
      const result = response.data.map((editor) => ({
        value: editor.id,
        label: `${editor.first_name} ${editor.last_name}`,
      }));
      setEditorsList(result);
    } catch (error) {
      console.error("Error fetching editors:", error);
    }
  };

  useEffect(() => {
    getEditorsList();
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

  const handleInputChange = async (e) => {
    const { id, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : `${id} is required.`,
    }));
    if (id === "segmentation") {
      await fetchTags(value);
    }
    if (
      id === "status" &&
      value === "inactive" &&
      editingGroup &&
      editingGroup.is_active
    ) {
      setEditingGroup((prevEditingGroup) => ({
        ...prevEditingGroup,
        is_active: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (
        !formValues[key] ||
        (Array.isArray(formValues[key]) && formValues[key].length === 0)
      ) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        group_name: formValues.groupName,
        description: formValues.description,
        is_active: formValues.status === "active",
        segmentation_criteria: formValues.segmentation,
        tags: formValues.tagAssigned?.map((tag) => tag.value),
        editors_group_assignment: formValues.assignedEditors?.map(
          (editor) => editor.value
        ),
      };

      setLoading(true);
      try {
        let response;
        if (editingGroup) {
          response = await put(
            `/group_management/update_group/${editingGroup.id}/`,
            payload
          );
          setPopup({
            show: true,
            message: "Group updated successfully",
            type: "success",
          });
        } else {
          response = await post("/group_management/create_group/", payload);
          setPopup({
            show: true,
            message: "Group created successfully",
            type: "success",
          });
        }
        togglePanel();
        fetchGroups();
      } catch (error) {
        console.error(
          "Error saving group:",
          error.response?.data || error.message
        );
        setPopup({
          show: true,
          message: `Error: ${
            error.response?.data.message ||
            "An unexpected error occurred, Please try again!!!"
          }`,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteClick = (id) => {
    setGroupToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!groupToDelete) {
      console.warn("No group selected for deletion.");
      return;
    }

    try {
      await del(`/group_management/delete_group/${groupToDelete}/`);
      console.log("Group deleted successfully");
      setPopup({
        show: true,
        message: "Group deleted successfully",
        type: "success",
      });

      fetchGroups();
    } catch (error) {
      console.error(
        `Error deleting group with ID ${groupToDelete}:`,
        error.response?.data || error.message
      );
      setPopup({
        show: true,
        message: `Error: ${
          error.response?.data.message ||
          "An unexpected error occurred, Please try again!!!"
        }`,
        type: "error",
      });
    } finally {
      setGroupToDelete(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get("/group_management/get_group/", {
        page,
        page_size: itemsPerPage,
      });
      const groupsWithAssignedEditors = response?.data?.groups.map((group) => ({
        ...group,
        assignedEditors: group.editor_assigned_groups
          .map(
            (editor) => `${editor.editor.first_name} ${editor.editor.last_name}`
          )
          .join(", "),
      }));
      setGroupData(groupsWithAssignedEditors);
      setTotalPages(response?.data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching groups:", error);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleEditClick = (id, rowData) => {
    console.log("rowdata", rowData);
    setEditingGroup(rowData);
    setFormValues({
      groupName: rowData.group_name,
      description: rowData.description,
      status: rowData.is_active ? "active" : "inactive",
      segmentation: rowData.segmentation_criteria,
      tagAssigned: rowData.tags.map((tag) => ({
        value: tag.id,
        label: tag.tag_name,
      })),
      assignedEditors: rowData.editor_assigned_groups.map((editor) => ({
        value: editor.editor.id,
        label: `${editor.editor.first_name} ${editor.editor.last_name}`,
      })),
    });
    setIsPanelOpen(true);
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
              Group Management
            </h2>
            <button className={styles.pageButton} onClick={() => togglePanel()}>
              <img src="/images/addnewgroup.svg" alt="Add Group Icon" />
              Add New Group
            </button>
          </div>

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
                      alerts={groupData}
                      visibleColumns={columnsConfig.groupmanagement}
                      onEditClick={handleEditClick}
                      onDeleteClick={handleDeleteClick}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>

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

        <SlidingPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
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
          <div className="p-4 pb-0 force-overflow">
            <h2 className="text-white text-[36px]">
              {editingGroup ? "Edit Group" : "Add New Group"}
            </h2>
          </div>
          <div className="p-6 bg-[#1C2546] text-white rounded-b-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="groupName"
                  placeholder="Enter your group Name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.groupName}
                  onChange={handleInputChange}
                />
                {errors.groupName && (
                  <span className={styles.error}>{errors.groupName}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Group description goes here"
                  rows="4"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.description}
                  onChange={handleInputChange}
                ></textarea>
                {errors.description && (
                  <span className={styles.error}>{errors.description}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  value={formValues.status}
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "In Active" },
                  ]}
                  onChange={(newValue) =>
                    handleInputChange({
                      target: { id: "status", value: newValue },
                    })
                  }
                  placeholder="Select Status"
                />
                {errors.status && (
                  <span className={styles.error}>{errors.status}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="segmentation"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Segmentation Criteria <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={[
                    { value: "keap", label: "Keap" },
                    { value: "go_high_level", label: "Go High Level" },
                  ]}
                  value={formValues.segmentation}
                  onChange={(newValue) =>
                    handleInputChange({
                      target: { id: "segmentation", value: newValue },
                    })
                  }
                  placeholder="Select Segmentation Criteria"
                />
                {errors.segmentation && (
                  <span className={styles.error}>{errors.segmentation}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tagAssigned"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Tag Assigned <span className="text-red-500">*</span>
                </label>

                <Select
                  isMulti
                  name="tagAssigned"
                  options={
                    !formValues.segmentation
                      ? [
                          {
                            value: "",
                            label: "Select Segmentation Criteria First",
                            isDisabled: true,
                          },
                        ]
                      : tags.length > 0
                      ? [
                          {
                            value: "",
                            label: "Fetching tags...",
                            isDisabled: true,
                          },
                          ...tags.map((tag) => ({
                            value: tag.id,
                            label: tag.tag_name,
                          })),
                        ]
                      : [
                          {
                            value: "",
                            label: "No tags available",
                            isDisabled: true,
                          },
                        ]
                  }
                  value={formValues.tagAssigned}
                  onChange={handleTagsChange}
                  placeholder={tagLoader ? "Loading tags..." : "Select Tags"}
                  classNamePrefix="select"
                  styles={customStyles}
                />

                {errors.tagAssigned && (
                  <span className={styles.error}>{errors.tagAssigned}</span>
                )}
              </div>

              <div className={styles.field8}>
                <label className="block text-white text-sm font-medium mb-2">
                  Assign Editors <span className="text-red-500">*</span>
                </label>
                <div className={styles.selectWrapper}>
                  <Select
                    isMulti
                    name="editors"
                    options={editorsList}
                    value={formValues.assignedEditors}
                    onChange={handleEditorChange}
                    placeholder="Select editors"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                  {errors.assignedEditors && (
                    <span className={styles.error}>
                      {errors.assignedEditors}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 mt-4 flex justify-start space-x-4">
                <button
                  type="submit"
                  className="w-[250px] h-[54px] p-[10px_8px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <Loading />
                  ) : editingGroup ? (
                    "Update Group"
                  ) : (
                    "Submit & Save"
                  )}
                </button>

                <button
                  type="button"
                  className="w-[250px] h-[54px] p-[10px_8px] border border-gray-600 text-white font-bold rounded-lg hover:bg-[#2a3b61] focus:outline-none flex items-center justify-center"
                  onClick={() => {
                    setFormValues({
                      groupName: "",
                      description: "",
                      status: "",
                      segmentation: "",
                      tagAssigned: [],
                      assignedEditors: [],
                    });
                    setErrors({});
                  }}
                >
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
          message="Are you sure you want to delete this group?"
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
