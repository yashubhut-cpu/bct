"use client";

import React, { useState, useEffect } from "react";
import styles from "./tags.module.css";
import Sidebar from "../component/Sidebar/sidebar";
import Header from "../component/Header/header";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import Select from "react-select";
import { get, postAsArray } from "../api/base";
import Popup from "../component/Popup";
import Loader from "../component/loading";
export default function TagsManagement() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [segmentationCriteria, setSegmentationCriteria] = useState("");
  const [tagAssigned, setTagAssigned] = useState([]);
  const [tags, setTags] = useState([]);
  const [rawTags, setRawTags] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [tagError, setTagError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });
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

    try {
      const response = await get(apiUrl);

      if (response.status === 200) {
        let data = response.data.tags || [];

        if (value === "keap") {
          data = data.map((tag) => ({
            ...tag,
            tag_name: tag.tag_extra_details
              ? `${tag.tag_extra_details.name} -> ${tag.tag_name}`
              : tag.tag_name,
          }));
        }

        console.log("Updated Tags Data ::", data);
        setTags(data);
      } else {
        throw new Error("Failed to fetch tags");
      }
    } catch (error) {
      setTags([]);
    }
  };

  const fetchRawTags = async (segmentationCriteria, page = 1, limit = 100) => {
    let apiUrl = "";

    if (segmentationCriteria === "keap") {
      apiUrl = `/tag_management/keap_raw_tags/?page=${page}&limit=${limit}`;
    } else if (segmentationCriteria === "go_high_level") {
      apiUrl = `/tag_management/ghl_raw_tags/?page=${page}&limit=${limit}`;
    } else {
      setRawTags([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await get(apiUrl);
      if (response.status === 200) {
        const data = await response.data.tags;
        console.log("Fetched Tags: ", data);

        setRawTags(data);
        setHasMore(true);
      } else {
        throw new Error("Failed to fetch tags");
      }
    } catch (error) {
      setRawTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(segmentationCriteria);
    setRawTags([]);
    setPage(1);
    setHasMore(true);
    fetchRawTags(segmentationCriteria, 1, 100);
  }, [segmentationCriteria]);

  useEffect(() => {
    if (tags.length > 0 && rawTags.length > 0) {
      const matchedTags = rawTags.filter((rawTag) =>
        tags.some((tag) => tag.tag_id === rawTag.id.toString())
      );

      const selectedTags = matchedTags.map((tag) => {
        const matchingTag = tags.find((t) => t.tag_id === tag.id.toString());
        if ("locationId" in tag) {
          return {
            value: tag.id,
            label: matchingTag ? matchingTag.tag_name : tag.name,
            locationId: tag.locationId,
          };
        }
        return {
          value: tag.id,
          label: matchingTag ? matchingTag.tag_name : tag.name,
          description: tag.description,
          category: tag.category,
        };
      });
      setTagAssigned(selectedTags);
    }
  }, [tags, rawTags]);

  const loadMoreTags = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchRawTags(segmentationCriteria, page + 1, 100);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!segmentationCriteria) {
      setSegmentationCriteriaError("Segmentation criteria is required.");
      isValid = false;
    } else {
      setSegmentationCriteriaError("");
    }

    if (!tagAssigned || tagAssigned.length === 0) {
      setTagError("At least one tag must be selected.");
      isValid = false;
    } else {
      setTagError("");
    }

    if (isValid) {
      setIsSubmitting(true);
      try {
        let payload;

        if (segmentationCriteria === "keap") {
          payload = rawTags.filter((tag) =>
            tagAssigned.some((t) => t.value === tag.id)
          );
        } else if (segmentationCriteria === "go_high_level") {
          payload = tagAssigned
            .filter((tag) => rawTags.some((rt) => rt.id === tag.value))
            .map((tag) => {
              return {
                id: tag.value,
                name: tag.label,
                locationId: tag.locationId || "",
              };
            });
        }

        let apiURL = "";
        if (segmentationCriteria === "keap") {
          apiURL = "/tag_management/save_tags/keap/";
        } else if (segmentationCriteria === "go_high_level") {
          apiURL = "/tag_management/save_tags/go_high_level/";
        }

        console.log("payload :: ", payload);

        const response = await postAsArray(apiURL, payload);

        console.log("Response :: ", response);

        if (response.status === 201 || response.status === 200) {
          console.log("Form submitted successfully");
          setPopup({
            show: true,
            message: "Tags saved successfully!",
            type: "success",
          });
        }
      } catch (error) {
        console.error("Error submitting tags:", error);
        setPopup({
          show: true,
          message: "Failed to submit tags",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
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
                  <label>
                    Segmentation Criteria{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <Select
                    name="segmentationCriteria"
                    options={[
                      { label: "Keap", value: "keap" },
                      { label: "Go High Level", value: "go_high_level" },
                    ]}
                    value={
                      segmentationCriteria
                        ? {
                            value: segmentationCriteria,
                            label:
                              segmentationCriteria === "keap"
                                ? "Keap"
                                : "Go High Level",
                          }
                        : null
                    }
                    onChange={(selectedOption) => {
                      const value = selectedOption ? selectedOption.value : "";
                      setSegmentationCriteria(value);
                      setSegmentationCriteriaError("");
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
                  <label>
                    Tag <span className="text-red-500">*</span>
                  </label>
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
                        : rawTags.length > 0
                        ? [
                            ...rawTags.map((tag) => {
                              if ("locationId" in tag) {
                                return {
                                  value: tag.id,
                                  label: tag.name,
                                  locationId: tag.locationId,
                                };
                              }
                              return {
                                value: tag.id,
                                label: tag.name,
                                description: tag.description,
                                category: tag.category,
                              };
                            }),
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
                    onScroll={loadMoreTags}
                    placeholder={
                      isloading ? "Loading..." : "Search and Select Tags"
                    }
                  />

                  {tagError && <span className={styles.error}>{tagError}</span>}
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={styles.saveButton + " relative"}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader position="top" /> : "Save"}
                  </button>
                  <button
                    className={styles.resetButton}
                    onClick={(e) => {
                      e.preventDefault();
                      setSegmentationCriteria("");
                      setTagAssigned("");
                      setTagError("");
                      setSegmentationCriteriaError("");
                      setIsLoading(false);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
