"use client";

import React, { useState, useEffect } from "react";
import styles from "./tags.module.css";
import Sidebar from "../component/Sidebar/sidebar";
import Header from "../component/Header/header";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import Select from "react-select";
import { get } from "../api/base";
import loading from "../component/loading";

export default function TagsManagement() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [segmentationCriteria, setSegmentationCriteria] = useState("");
  const [tagAssigned, setTagAssigned] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagError, setTagError] = useState("");
  const [segmentationCriteriaError, setSegmentationCriteriaError] =
    useState("");

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
    setTagsLoading(true);

    try {
      const response = await get(apiUrl);
      console.log("response :: ", response);
      if (response.status === 200) {
        const data = await response.data;
        setTags(data.tags);
      } else {
        throw new Error("Failed to fetch tags");
      }
    } catch (error) {
      setTags([]);
    } finally {
      setTagsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(segmentationCriteria);
  }, []);

  const handleTagChange = (select) => {
    const tagAssigned = select || [];
    console.log("tagAssigned :: ", tagAssigned);

    setTagAssigned(tagAssigned);

    setTagError(
      tagAssigned.length > 0 ? "" : "At least one tag must be selected."
    );
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!segmentationCriteria) {
      setSegmentationCriteriaError("Segmentation criteria is required.");
      isValid = false;
    } else {
      setSegmentationCriteriaError("");
    }

    // Validate tag selection
    if (!tagAssigned || tagAssigned.length === 0) {
      setTagError("At least one tag must be selected.");
      isValid = false;
    } else {
      setTagError("");
    }

    if (isValid) {
      console.log("Form submitted successfully");
    }
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
              Tags Management
            </h2>
          </div>

          <div className={styles.container + " mx-2 mb-3"}>
            <div className={styles.section}>
              <form onSubmit={handleSubmit}>
                {/* input 1 */}
                <div className={styles.inputGroup}>
                  <label>Segmentation Criteria*</label>

                  <Select
                    name="segmentationCriteria"
                    options={[
                      { label: "Keap", value: "keap" },
                      { label: "Go High Level", value: "go_high_level" },
                    ]}
                    value={segmentationCriteria}
                    onChange={(value) => {
                      setSegmentationCriteria(value);
                      setSegmentationCriteriaError("");
                      fetchTags(value);
                    }}
                    styles={customStyles}
                    placeholder="Select Segmentation Criteria"
                  />

                  {segmentationCriteriaError && (
                    <span className={styles.error}>
                      {segmentationCriteriaError}
                    </span>
                  )}
                </div>

                {/* input 2 */}
                <div className={styles.inputGroup}>
                  <label>Tag Assigned*</label>

                  <Select
                    isMulti
                    name="tags"
                    options={
                      !segmentationCriteria
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
                              label: "No tags found",
                              isDisabled: true,
                            },
                          ]
                    }
                    value={tagAssigned}
                    onChange={handleTagChange}
                    styles={customStyles}
                    placeholder={
                      tagsLoading ? "Loading..." : "Search and Select Tags"
                    }
                  />

                  {tagError && <span className={styles.error}>{tagError}</span>}
                </div>

                <div className={styles.buttonGroup}>
                  <button className={styles.saveButton}>Save</button>
                  <button
                    className={styles.resetButton}
                    onClick={(e) => {
                      e.preventDefault();
                      setSegmentationCriteria("");
                      setTagAssigned("");
                      setTagError("");
                      setSegmentationCriteriaError("");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
