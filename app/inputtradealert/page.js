"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import styles from "../inputtradealert/inputtradealert.module.css";
import Sidebar from "../component/Sidebar/sidebar";
import Home from "../component/Editor/editor";
import dynamic from "next/dynamic";
import Header from "../component/Header/header";
import CustomSelect from "../component/CustomSelect";
import { get, post } from "../api/base";
import Popup from "../component/Popup";
import Loading from "../component/loading";
const Select = dynamic(() => import("react-select"), { ssr: false });

export default function InputTradeAlert() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [isPopupActive, setIsPopupActive] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [formValues, setFormValues] = useState({
    tradeTitle: "",
    tickerSymbol: "",
    entryPrice: "",
    exitPrice: "",
    tradeDescription: "",
    emailSubject: "",
    segmentation: "",
    groupSelection: [],
    distribution: [],
  });
  const router = useRouter();

  useEffect(() => {
    document.title = "Input Trade Alert";
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarActive(!isMobileSidebarActive);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.tradeTitle.trim()) {
      newErrors.tradeTitle = "Trade title is required.";
    }
    if (!formValues.tickerSymbol.trim()) {
      newErrors.tickerSymbol = "Ticker symbol is required.";
    }
    if (!formValues.entryPrice.trim()) {
      newErrors.entryPrice = "Entry price is required.";
    }
    if (!formValues.exitPrice.trim()) {
      newErrors.exitPrice = "Exit price is required.";
    }
    if (!formValues.emailSubject.trim()) {
      newErrors.emailSubject = "Email subject is required.";
    }
    if (!formValues.segmentation) {
      newErrors.segmentation = "Segmentation criteria is required.";
    }
    if (formValues.groupSelection.length === 0) {
      newErrors.groupSelection = "At least one group must be selected.";
    }
    if (formValues.distribution.length === 0) {
      newErrors.distribution =
        "At least one distribution method must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payload = {
          trade_title: formValues.tradeTitle,
          ticker_symbol: formValues.tickerSymbol,
          entry_price: formValues.entryPrice,
          exit_price: formValues.exitPrice,
          trade_description: formValues.tradeDescription,
          email_subject: formValues.emailSubject,
          segmentation_criteria: formValues.segmentation,
          groups: formValues.groupSelection,
          distribution: formValues.distribution,
        };

        const response = await post(
          "/input_trade_alert/input_trade_alert_create_update/",
          payload
        );

        if (response.status === 201) {
          setIsPopupActive({
            show: true,
            message: "Your trade alert has been submitted successfully.",
            type: "success",
          });
          setFormValues({
            tradeTitle: "",
            tickerSymbol: "",
            entryPrice: "",
            exitPrice: "",
            tradeDescription: "",
            emailSubject: "",
            segmentation: "",
            groupSelection: [],
            distribution: [],
          });
          setErrors({});
        } else {
          throw new Error("Failed to submit trade alert");
        }
      } catch (error) {
        setIsPopupActive({
          show: true,
          message: "Failed to submit trade alert.",
          type: "error",
        });
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    console.log("Groups updated:", groups);
  }, [groups]);

  const fetchGroups = async (value) => {
    let apiUrl = "";

    if (value === "keap") {
      apiUrl = "/group_management/groups_list_by_platform/keap/";
    } else if (value === "go_high_level") {
      apiUrl = "/group_management/groups_list_by_platform/go_high_level/";
    } else {
      setGroups([]);
      return;
    }

    try {
      const response = await get(apiUrl);

      if (response.status === 200) {
        const result = response.data.map((g) => ({
          value: g.id,
          label: g.group_name,
        }));
        console.log("Processed groups:", result);
        setGroups(result);
      } else {
        throw new Error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setGroups([]);
    }
  };

  useEffect(() => {
    if (formValues.segmentation) {
      fetchGroups(formValues.segmentation);
    } else {
      setGroups([
        {
          value: "disabled",
          label: "Please select segmentation criteria first",
          isDisabled: true,
        },
      ]);
    }
  }, [formValues.segmentation]);

  const handleGroupChange = (selectedOptions) => {
    const groupSelection = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      groupSelection,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      groupSelection:
        groupSelection.length > 0 ? "" : prevErrors.groupSelection,
    }));
  };

  const handleInputChange = async (e) => {
    let id, value;

    if (typeof e === "string") {
      // Handle JoditEditor's HTML content
      id = "tradeDescription";
      value = e;
    } else if (e && e.target) {
      // Handle standard input events
      id = e.target.id;
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    } else if (e && e.id && "value" in e) {
      // Handle custom select or other objects
      id = e.id;
      value = e.value;
    } else {
      console.error("Unexpected Input Value:", e);
      return;
    }

    // Update form values
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));

    // Update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : `This field is required.`,
    }));

    // Fetch groups if segmentation changes
    if (id === "segmentation") {
      await fetchGroups(value);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        groupSelection: [],
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormValues((prevFormValues) => {
      const distribution = checked
        ? [...prevFormValues.distribution, id]
        : prevFormValues.distribution.filter((item) => item !== id);
      return {
        ...prevFormValues,
        distribution,
      };
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      distribution: checked ? "" : prevErrors.distribution,
    }));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      marginTop: "10px",
      borderRadius: "12px",
      backgroundColor: "transparent",
      color: "#fff",
      borderColor: "#999",
      boxShadow: "none",
      padding: "5px 10px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": {
        color: "#ff6b6b",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      color: "#fff",
      border: "1px solid #A3AED0",
      borderRadius: "12px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1C2546" : "transparent",
      color: state.isDisabled ? "#FFF" : "#FFF",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      ":hover": {
        backgroundColor: state.isDisabled ? "transparent" : "#2196f3",
        borderRadius: "5px",
        color: "#FFF",
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
      borderColor: "",
      border: "1px solid #ff6b6b",
      padding: "5px",
      ":hover": {
        backgroundColor: "#ff6b6b",
        color: "#fff",
      },
    }),
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
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
        {/* Main Dashboard */}
        <div className={styles.container2}>
          {/* Input Trade Alert Content */}
          <div className={styles.pageContent}>
            <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
                Input Trade Alert
              </h2>
            </div>
            <div className="mx-2 me-5 mb-4">
              <div className="bg-[#1C2546] p-4 rounded-[20px] shadow">
                <form onSubmit={handleSubmit}>
                  <div className={styles.fieldSection}>
                    {/* Trade Title */}
                    <div className={styles.inputField}>
                      <div className={styles.field1}>
                        <label>Trade title*</label>
                        <input
                          id="tradeTitle"
                          type="text"
                          placeholder="Enter your trade title"
                          value={formValues.tradeTitle}
                          onChange={handleInputChange}
                        />
                        {errors.tradeTitle && (
                          <span className={styles.error}>
                            {errors.tradeTitle}
                          </span>
                        )}
                      </div>

                      {/* Entry Section */}
                      <div className="entrySection flex flex-col sm:flex-row md:flex-row lg:flex-row gap-4 mb-5 px-5 mt-4">
                        {/* Ticker Symbol */}
                        <div className="field2 w-full sm:w-1/3">
                          <label className="block mb-2 font-semibold">
                            Ticker Symbol*
                          </label>
                          <input
                            type="text"
                            id="tickerSymbol"
                            placeholder="TYP"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formValues.tickerSymbol}
                            onChange={handleInputChange}
                          />
                          {errors.tickerSymbol && (
                            <span className={styles.error}>
                              {errors.tickerSymbol}
                            </span>
                          )}
                        </div>

                        {/* Entry Price */}
                        <div className="field3 w-full sm:w-1/3">
                          <label className="block mb-2 font-semibold">
                            Entry Price*
                          </label>
                          <input
                            type="text"
                            id="entryPrice"
                            placeholder="$ 0.00"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formValues.entryPrice}
                            onChange={handleInputChange}
                          />
                          {errors.entryPrice && (
                            <span className={styles.error}>
                              {errors.entryPrice}
                            </span>
                          )}
                        </div>

                        {/* Exit Price */}
                        <div className="field4 w-full sm:w-1/3">
                          <label className="block mb-2 font-semibold">
                            Exit Price*
                          </label>
                          <input
                            id="exitPrice"
                            type="text"
                            placeholder="$ 0.00"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formValues.exitPrice}
                            onChange={handleInputChange}
                          />
                          {errors.exitPrice && (
                            <span className={styles.error}>
                              {errors.exitPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Trade Description */}
                      <div className={styles.field5}>
                        <label style={{ marginBottom: "20px" }}>
                          Trade Description*
                        </label>
                        <Home
                          onChange={(value) => handleInputChange(value)}
                          value={formValues.tradeDescription}
                        />
                      </div>

                      {/* Email Subject */}
                      <div className={styles.field6}>
                        <label>Email Subject*</label>
                        <input
                          id="emailSubject"
                          type="text"
                          placeholder="Write an email subject"
                          value={formValues.emailSubject}
                          onChange={handleInputChange}
                        />
                        {errors.emailSubject && (
                          <span className={styles.error}>
                            {errors.emailSubject}
                          </span>
                        )}
                      </div>

                      {/* Segmentation Criteria */}
                      <div className={styles.field7}>
                        <label htmlFor="segmentation">
                          Segmentation Criteria*
                        </label>
                        <CustomSelect
                          id="segmentation"
                          options={[
                            { value: "keap", label: "Keap" },
                            { value: "go_high_level", label: "Go High Level" },
                          ]}
                          value={formValues.segmentation}
                          onChange={(newValue) =>
                            handleInputChange({
                              id: "segmentation",
                              value: newValue,
                            })
                          }
                          placeholder="Select segmentation criteria"
                        />
                        {errors.segmentation && (
                          <span className={styles.error}>
                            {errors.segmentation}
                          </span>
                        )}
                      </div>

                      {/* Group Selection */}
                      <div className={styles.field8}>
                        <label>Group Selection*</label>
                        <div className={styles.selectWrapper}>
                          <Select
                            key={groups.length}
                            isMulti
                            name="groups"
                            options={groups}
                            value={formValues.groupSelection.map((value) =>
                              groups.find((group) => group.value === value)
                            )}
                            onChange={handleGroupChange}
                            placeholder="Search and select groups"
                            classNamePrefix="select"
                            styles={customStyles}
                            isOptionDisabled={(option) => option.isDisabled}
                          />
                          {errors.groupSelection && (
                            <span className={styles.error}>
                              {errors.groupSelection}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Distribution Checkboxes */}
                      <div className={styles.field9}>
                        <label>Distribution*</label>
                        <div className={styles.checkBoxBtn}>
                          {/* Email Checkbox */}
                          <div className={styles.checkBoxEmail}>
                            <input
                              type="checkbox"
                              id="email"
                              checked={formValues.distribution.includes(
                                "email"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="email">Email</label>
                          </div>

                          {/* SMS Checkbox */}
                          <div className={styles.checkBoxSMS}>
                            <input
                              type="checkbox"
                              id="sms"
                              checked={formValues.distribution.includes("sms")}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="sms">SMS</label>
                          </div>

                          {/* WordPress Checkbox */}
                          <div className={styles.checkBoxWordPress}>
                            <input
                              type="checkbox"
                              id="word_press"
                              checked={formValues.distribution.includes(
                                "word_press"
                              )}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="word_press">WordPress</label>
                          </div>
                        </div>

                        {/* Display Error */}
                        {errors.distribution && (
                          <span className={styles.error}>
                            {errors.distribution}
                          </span>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className={styles.button + " flex flex-wrap gap-4"}>
                        {/* Submit Button */}
                        <div className="w-full sm:w-auto">
                          <button type="submit" className={styles.submitBtn}>
                            {loading ? <Loading /> : "Submit"}
                          </button>
                        </div>

                        {/* Preview Button */}
                        <div className="w-full sm:w-auto">
                          <button type="button" className={styles.previewBtn}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_2536_2834)">
                                <path
                                  d="M23.7711 9.41891C22.2201 6.89291 18.6921 2.65491 12.5001 2.65491C6.30805 2.65491 2.78005 6.89291 1.22905 9.41891C0.749579 10.1944 0.495605 11.0881 0.495605 11.9999C0.495605 12.9117 0.749579 13.8054 1.22905 14.5809C2.78005 17.1069 6.30805 21.3449 12.5001 21.3449C18.6921 21.3449 22.2201 17.1069 23.7711 14.5809C24.2505 13.8054 24.5045 12.9117 24.5045 11.9999C24.5045 11.0881 24.2505 10.1944 23.7711 9.41891ZM22.0661 13.5339C20.7341 15.6999 17.7191 19.3449 12.5001 19.3449C7.28105 19.3449 4.26605 15.6999 2.93405 13.5339C2.64919 13.073 2.4983 12.5418 2.4983 11.9999C2.4983 11.458 2.64919 10.9269 2.93405 10.4659C4.26605 8.29991 7.28105 4.65491 12.5001 4.65491C17.7191 4.65491 20.7341 8.29591 22.0661 10.4659C22.3509 10.9269 22.5018 11.458 22.5018 11.9999C22.5018 12.5418 22.3509 13.073 22.0661 13.5339Z"
                                  fill="#A3AED0"
                                />
                                <path
                                  d="M12.5 6.99988C11.5111 6.99988 10.5444 7.29312 9.72215 7.84253C8.89991 8.39194 8.25904 9.17283 7.8806 10.0865C7.50217 11.0001 7.40315 12.0054 7.59608 12.9753C7.789 13.9452 8.26521 14.8362 8.96447 15.5354C9.66373 16.2347 10.5546 16.7109 11.5246 16.9038C12.4945 17.0967 13.4998 16.9977 14.4134 16.6193C15.327 16.2408 16.1079 15.6 16.6574 14.7777C17.2068 13.9555 17.5 12.9888 17.5 11.9999C17.4984 10.6743 16.9711 9.40344 16.0338 8.4661C15.0964 7.52876 13.8256 7.00147 12.5 6.99988ZM12.5 14.9999C11.9067 14.9999 11.3266 14.8239 10.8333 14.4943C10.3399 14.1646 9.95543 13.6961 9.72836 13.1479C9.5013 12.5998 9.44189 11.9966 9.55765 11.4146C9.6734 10.8327 9.95912 10.2981 10.3787 9.87856C10.7982 9.459 11.3328 9.17328 11.9147 9.05752C12.4967 8.94177 13.0999 9.00118 13.6481 9.22824C14.1962 9.4553 14.6648 9.83982 14.9944 10.3332C15.3241 10.8265 15.5 11.4065 15.5 11.9999C15.5 12.7955 15.1839 13.5586 14.6213 14.1212C14.0587 14.6838 13.2957 14.9999 12.5 14.9999Z"
                                  fill="#A3AED0"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_2536_2834">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            Preview Alert
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Popup */}
                {isPopupActive.show && (
                  <Popup
                    message={isPopupActive.message}
                    type={isPopupActive.type}
                    onClose={() =>
                      setIsPopupActive({ ...isPopupActive, show: false })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
