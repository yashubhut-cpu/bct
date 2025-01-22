"use client";
import { useState, useEffect } from "react";
import styles from "../inputtradealert/inputtradealert.module.css";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Sidebar from "../component/Sidebar/sidebar";
import Home from "../component/Editor/editor";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import Header from "../component/Header/header";

// please check here...
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function InputTradeAlert() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  }

  const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);

  const [selectOptions, setSelectedOptions] = useState([]);
  const [selectOptions1, setSelectedOptions1] = useState([]);
  console.log("Select:", selectOptions);
  console.log("Select:", selectOptions1);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    tradeTitle: "",
    tickerSymbol: "",
    entryPrice: "",
    exitPrice: "",
    emailSubject: "",
    segmentation: "",
    groupSelection: [],
    email: false,
    sms: false,
    wordpress: false,
  });

  const [errors, setErrors] = useState({});

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
      newErrors.groupSelection = "At least one group must be select.";

    }
    if (!formValues.email && !formValues.sms && !formValues.wordpress) {
      newErrors.distribution = "At least one distribution method must be select.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear error on input change
  };

  const handleChange1 = (select) => {
    setSelectedOptions1(select);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      segmentation: select ? select.label : "",
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      segmentation: select ? "" : "Segmentation criteria is required.",
    }));
  };

  const handleChange = (select) => {
    setSelectedOptions(select);

    // Update groupSelection array in formValues
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      groupSelection: select ? select.map((item) => item.label) : [], // Map labels to the array
    }));

    // Handle validation errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      groupSelection: select && select.length > 0 ? "" : "At least one group must be select.",
    }));
  };

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    document.title = "Input Trade Alert";
    if (localStorage.getItem("accessToken")) {
      router.push('/inputtradealert')
    } else {
      router.push('/')
    }
  }, [router]);





  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  const groups = [
    { value: "group1", label: "Group 1 name here" },
    { value: "group2", label: "Group 2 name here" },
    { value: "group3", label: "Group 3 name here" },
    { value: "group4", label: "Group 4 name here" },
  ];
  const singleValue = [
    { value: "group1", label: "Group 1 name here" },
    { value: "group2", label: "Group 2 name here" },
    { value: "group3", label: "Group 3 name here" },
    { value: "group4", label: "Group 4 name here" },
  ];

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
      color: "#fff", // Ensure the select value in the input field is white
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#fff", // Customize the color of the clear button
      ":hover": {
        color: "#ff6b6b", // Change color on hover
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
      color: "#FFF",
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
        isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
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
                <div className={styles.fieldSection}>
                  <div className={styles.inputField}>
                    <div className={styles.field1}>
                      <label>Trade title*</label>
                      <input type="text" placeholder="Enter your trade title"
                        value={formValues.tradeTitle}
                        onChange={(e) => handleInputChange("tradeTitle", e.target.value)} />
                      {errors.tradeTitle && <span className={styles.error}>{errors.tradeTitle}</span>}

                    </div>

                    <div className="entrySection flex flex-col sm:flex-row md:flex-row lg:flex-row gap-4 mb-5 px-5 mt-4">
                      <div className="field2 w-full sm:w-1/3">
                        <label className="block mb-2 font-semibold">Ticker Symbol*</label>
                        <input type="text" placeholder="TYP" className="w-full p-2 border border-gray-300 rounded" value={formValues.tickerSymbol}
                          onChange={(e) => handleInputChange("tickerSymbol", e.target.value)} />
                        {errors.tickerSymbol && <span className={styles.error}>{errors.tickerSymbol}</span>}

                      </div>

                      <div className="field3 w-full sm:w-1/3">
                        <label className="block mb-2 font-semibold">Entry Price*</label>
                        <input type="text" placeholder="$ 0.00" className="w-full p-2 border border-gray-300 rounded" value={formValues.entryPrice}
                          onChange={(e) => handleInputChange("entryPrice", e.target.value)} />
                        {errors.entryPrice && <span className={styles.error}>{errors.entryPrice}</span>}

                      </div>

                      <div className="field4 w-full sm:w-1/3">
                        <label className="block mb-2 font-semibold">Exit Price*</label>
                        <input type="text" placeholder="$ 0.00" className="w-full p-2 border border-gray-300 rounded" value={formValues.exitPrice}
                          onChange={(e) => handleInputChange("exitPrice", e.target.value)} />
                        {errors.exitPrice && <span className={styles.error}>{errors.exitPrice}</span>}

                      </div>

                    </div>


                    <div className={styles.field5}>
                      <label style={{ marginBottom: "20px" }}>Trade Description*</label>
                      <Home />
                    </div>

                    <div className={styles.field6}>
                      <label>Email Subject*</label>
                      <input type="text" placeholder="Write a email subject"
                        onChange={(e) => handleInputChange("emailSubject", e.target.value)} />
                      {errors.emailSubject && <span className={styles.error}>{errors.emailSubject}</span>}

                    </div>

                    <div className={styles.field7}>
                      <label>Segmentation Criteria*</label>
                      <div className={styles.selectWrapper}>
                        <Select
                          name="segmentation"
                          options={singleValue}
                          value={singleValue.find(option => option.label === formValues.segmentation)}
                          onChange={handleChange1} // Update segmentation in formValues
                          placeholder="Select Segmentation Criteria"
                          classNamePrefix="select"
                          styles={customStyles}
                          isClearable
                        />
                        {errors.segmentation && <span className={styles.error}>{errors.segmentation}</span>}
                      </div>
                    </div>


                    <div className={styles.field8}>
                      <label>Group Selection*</label>
                      <div className={styles.selectWrapper}>
                        <Select
                          isMulti
                          name="groups"
                          options={groups}
                          value={groups.find(option => option.label === formValues.groupSelection)}
                          onChange={handleChange}
                          placeholder="Select multiple groups"
                          classNamePrefix="select"
                          styles={customStyles}
                        />
                        {errors.groupSelection && <span className={styles.error}>{errors.groupSelection}</span>}
                      </div>
                    </div>


                    <div className={styles.field9}>
                      <label>Distribution*</label>
                      <div className={styles.checkBoxBtn}>
                        {/* Email Checkbox */}
                        <div className={styles.checkBoxEmail}>
                          <input
                            type="checkbox"
                            id="checkboxEmail"
                            checked={formValues.email || false}
                            onChange={(e) =>
                              setFormValues({ ...formValues, email: e.target.checked }, setErrors({ ...errors, distribution: "" }))
                            }
                          />
                          <label htmlFor="checkboxEmail">Email</label>
                        </div>

                        {/* SMS Checkbox */}
                        <div className={styles.checkBoxSMS}>
                          <input
                            type="checkbox"
                            id="checkboxSMS"
                            checked={formValues.sms || false}
                            onChange={(e) =>
                              setFormValues({ ...formValues, sms: e.target.checked }, setErrors({ ...errors, distribution: "" }))
                            }
                          />
                          <label htmlFor="checkboxSMS">SMS</label>
                        </div>

                        {/* WordPress Checkbox */}
                        <div className={styles.checkBoxWordPress}>
                          <input
                            type="checkbox"
                            id="checkboxWordPress"
                            checked={formValues.wordpress || false}
                            onChange={(e) =>
                              setFormValues({ ...formValues, wordpress: e.target.checked }, setErrors({ ...errors, distribution: "" }))
                            }
                          />
                          <label htmlFor="checkboxWordPress">WordPress</label>
                        </div>
                      </div>

                      {/* Display Error */}
                      {errors.distribution && (
                        <span className={styles.error}>
                          {errors.distribution}
                        </span>
                      )}
                    </div>

                    <div className={styles.button + " flex flex-wrap gap-4"}>
                      <div className="w-full sm:w-auto">
                        <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
                        {submitted && <div className={styles.successMessage}>Submission successful!</div>}
                      </div>

                      <div className="w-full sm:w-auto">
                        <button className={styles.previewBtn}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <g clipPath="url(#clip0_2536_2834)">
                              <path d="M23.7711 9.41891C22.2201 6.89291 18.6921 2.65491 12.5001 2.65491C6.30805 2.65491 2.78005 6.89291 1.22905 9.41891C0.749579 10.1944 0.495605 11.0881 0.495605 11.9999C0.495605 12.9117 0.749579 13.8054 1.22905 14.5809C2.78005 17.1069 6.30805 21.3449 12.5001 21.3449C18.6921 21.3449 22.2201 17.1069 23.7711 14.5809C24.2505 13.8054 24.5045 12.9117 24.5045 11.9999C24.5045 11.0881 24.2505 10.1944 23.7711 9.41891ZM22.0661 13.5339C20.7341 15.6999 17.7191 19.3449 12.5001 19.3449C7.28105 19.3449 4.26605 15.6999 2.93405 13.5339C2.64919 13.073 2.4983 12.5418 2.4983 11.9999C2.4983 11.458 2.64919 10.9269 2.93405 10.4659C4.26605 8.29991 7.28105 4.65491 12.5001 4.65491C17.7191 4.65491 20.7341 8.29591 22.0661 10.4659C22.3509 10.9269 22.5018 11.458 22.5018 11.9999C22.5018 12.5418 22.3509 13.073 22.0661 13.5339Z" fill="#A3AED0" />
                              <path d="M12.5 6.99988C11.5111 6.99988 10.5444 7.29312 9.72215 7.84253C8.89991 8.39194 8.25904 9.17283 7.8806 10.0865C7.50217 11.0001 7.40315 12.0054 7.59608 12.9753C7.789 13.9452 8.26521 14.8362 8.96447 15.5354C9.66373 16.2347 10.5546 16.7109 11.5246 16.9038C12.4945 17.0967 13.4998 16.9977 14.4134 16.6193C15.327 16.2408 16.1079 15.6 16.6574 14.7777C17.2068 13.9555 17.5 12.9888 17.5 11.9999C17.4984 10.6743 16.9711 9.40344 16.0338 8.4661C15.0964 7.52876 13.8256 7.00147 12.5 6.99988ZM12.5 14.9999C11.9067 14.9999 11.3266 14.8239 10.8333 14.4943C10.3399 14.1646 9.95543 13.6961 9.72836 13.1479C9.5013 12.5998 9.44189 11.9966 9.55765 11.4146C9.6734 10.8327 9.95912 10.2981 10.3787 9.87856C10.7982 9.459 11.3328 9.17328 11.9147 9.05752C12.4967 8.94177 13.0999 9.00118 13.6481 9.22824C14.1962 9.4553 14.6648 9.83982 14.9944 10.3332C15.3241 10.8265 15.5 11.4065 15.5 11.9999C15.5 12.7955 15.1839 13.5586 14.6213 14.1212C14.0587 14.6838 13.2957 14.9999 12.5 14.9999Z" fill="#A3AED0" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2536_2834">
                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                              </clipPath>
                            </defs>
                          </svg>
                          Preview Alert
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


