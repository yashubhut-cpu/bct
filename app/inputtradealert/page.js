"use client";
import { useState } from "react";
import Select from "react-select";
import styles from "../inputtradealert/inputtradealert.module.css";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Sidebar from "../component/Sidebar/sidebar";
import Home from "../component/Editor/editor";

export default function InputTradeAlert() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      color: "#fff", // Ensure the selected value in the input field is white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1C2546",
      color: "#fff",
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

  const handleChange = (selected) => {
    setSelectedOptions(selected); // Store the selected options
  };
  const handleChange1 = (selected) => {
    setSelectedOptions1(selected); // Store the selected options
  };

  return (
    <div className={styles.mainContainer}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={handleSidebarToggle} />
      <div
        className={`${styles.mainContent} ${
          isSidebarCollapsed ? styles.collapsed : styles.expanded
        }`}
      >

      {/* Main Dashboard */}
      <div className={styles.container2}>
        {/* Top Section with Search Bar */}

        {/* Input Trade Alert Content */}
        <div className={styles.fieldContainer}>
          <div className={styles.headerName}>
            <label>Input Trade Alert</label>
          </div>

          <div className={styles.fieldSection}>
            <div className={styles.inputField}>
              <div className={styles.field1}>
                <label>Trade title*</label>
                <input type="text" placeholder="Enter your trade title" />
              </div>

              <div className={styles.entrySection}>
                <div className={styles.field2}>
                  <label>Ticker Symbol*</label>
                  <input type="text" placeholder="TYP" />
                </div>

                <div className={styles.field3}>
                  <label>Entry Price*</label>
                  <input type="text" placeholder="$ 0.00" />
                </div>

                <div className={styles.field4}>
                  <label>Exit Price*</label>
                  <input type="text" placeholder="$ 0.00" />
                </div>
              </div>

              <div className={styles.field5}>
                <label style={{ marginBottom: "20px" }}>Trade Description*</label>
                <Home />
              </div>

              <div className={styles.field6}>
                <label>Email Subject*</label>
                <input type="text" placeholder="Write a email subject" />
              </div>

              <div className={styles.field7}>
                <label>Segmentation Criteria*</label>
                <div className={styles.selectWrapper}>
                  <Select
                    name="single"
                    options={singleValue}
                    value={selectedOptions1}
                    onChange={handleChange1}
                    placeholder="Select Segmentation Criteria"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className={styles.field8}>
                <label>Group Selection*</label>
                <div className={styles.selectWrapper}>
                  <Select
                    isMulti
                    name="groups"
                    options={groups}
                    value={selectedOptions}
                    onChange={handleChange}
                    placeholder="Select multiple groups"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className={styles.field9}>
                <label>Distribution*</label>
                <div className={styles.checkBoxBtn}>
                  <div className={styles.checkBoxEmail}>
                    <input type="checkbox" id="checkboxEmail" />
                    <label htmlFor="checkboxEmail">Email</label>
                  </div>

                  <div className={styles.checkBoxSMS}>
                    <input type="checkbox" id="checkboxSMS" />
                    <label htmlFor="checkboxSMS">SMS</label>
                  </div>

                  <div className={styles.checkBoxWordPress}>
                    <input type="checkbox" id="checkboxWordPress" />
                    <label htmlFor="checkboxWordPress">WordPress</label>
                  </div>
                </div>
              </div>

              <div className={styles.button}>
                <div className={styles.submitBtn}>
                  <button>Submit</button>
                </div>

                <div className={styles.previewBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <g clip-path="url(#clip0_2536_2834)">
                      <path d="M23.7711 9.41891C22.2201 6.89291 18.6921 2.65491 12.5001 2.65491C6.30805 2.65491 2.78005 6.89291 1.22905 9.41891C0.749579 10.1944 0.495605 11.0881 0.495605 11.9999C0.495605 12.9117 0.749579 13.8054 1.22905 14.5809C2.78005 17.1069 6.30805 21.3449 12.5001 21.3449C18.6921 21.3449 22.2201 17.1069 23.7711 14.5809C24.2505 13.8054 24.5045 12.9117 24.5045 11.9999C24.5045 11.0881 24.2505 10.1944 23.7711 9.41891ZM22.0661 13.5339C20.7341 15.6999 17.7191 19.3449 12.5001 19.3449C7.28105 19.3449 4.26605 15.6999 2.93405 13.5339C2.64919 13.073 2.4983 12.5418 2.4983 11.9999C2.4983 11.458 2.64919 10.9269 2.93405 10.4659C4.26605 8.29991 7.28105 4.65491 12.5001 4.65491C17.7191 4.65491 20.7341 8.29591 22.0661 10.4659C22.3509 10.9269 22.5018 11.458 22.5018 11.9999C22.5018 12.5418 22.3509 13.073 22.0661 13.5339Z" fill="#A3AED0" />
                      <path d="M12.5 6.99988C11.5111 6.99988 10.5444 7.29312 9.72215 7.84253C8.89991 8.39194 8.25904 9.17283 7.8806 10.0865C7.50217 11.0001 7.40315 12.0054 7.59608 12.9753C7.789 13.9452 8.26521 14.8362 8.96447 15.5354C9.66373 16.2347 10.5546 16.7109 11.5246 16.9038C12.4945 17.0967 13.4998 16.9977 14.4134 16.6193C15.327 16.2408 16.1079 15.6 16.6574 14.7777C17.2068 13.9555 17.5 12.9888 17.5 11.9999C17.4984 10.6743 16.9711 9.40344 16.0338 8.4661C15.0964 7.52876 13.8256 7.00147 12.5 6.99988ZM12.5 14.9999C11.9067 14.9999 11.3266 14.8239 10.8333 14.4943C10.3399 14.1646 9.95543 13.6961 9.72836 13.1479C9.5013 12.5998 9.44189 11.9966 9.55765 11.4146C9.6734 10.8327 9.95912 10.2981 10.3787 9.87856C10.7982 9.459 11.3328 9.17328 11.9147 9.05752C12.4967 8.94177 13.0999 9.00118 13.6481 9.22824C14.1962 9.4553 14.6648 9.83982 14.9944 10.3332C15.3241 10.8265 15.5 11.4065 15.5 11.9999C15.5 12.7955 15.1839 13.5586 14.6213 14.1212C14.0587 14.6838 13.2957 14.9999 12.5 14.9999Z" fill="#A3AED0" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2536_2834">
                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <button>Preview Alert</button>
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
