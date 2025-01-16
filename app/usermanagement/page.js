"use client";
import { useState, useEffect } from "react";
import React from "react";
import styles from "../usermanagement/styles.module.css"; // Correctly import the CSS module here
import Sidebar from "../component/sidebar/sidebar";
import Table from "../component/tablecomponent"; // Import the Table component
import columnsConfig from "../columnsConfig"; // Import the columnsConfig
import { ChevronRight } from "lucide-react";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import SlidingPanel from "../component/SlidingPanel"; // Import reusable SlidingPanel
import Select from "react-select";
import { del, get, post, put } from "../api/base";
import { useRouter } from "next/navigation";
import Header from "../component/Header/header";


export default function Usermanagement() {

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive((prev) => {
      const newActive = !prev;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        status: newActive ? "true" : "false",
      }));
      console.log("User active status:", newActive);
      return newActive;
    });
  };


  const [formValues, setFormValues] = useState({
    UserName: "",
    email: "",
    Password: "",
    status: active ? "true" : "false",
    Role: "",
  });

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive); // Toggle the state
  }

  const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await get('/user_management/user_management_list/');
      setUsers(response.data?.users);
    };
    fetchUsers();

  }, []);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await get('/user_management/group_list/');
        setGroups(
          response.data.map((group) => ({
            value: group.id,
            label: group.group_name,
          }))
        );
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }

    fetchGroups();
  }, []);

  useEffect(() =>{
    setIsPanelOpen(isPanelOpen);
  }, [isPanelOpen])

  const togglePanel = () => { 
    setIsPanelOpen(!isPanelOpen);
  };

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    document.title = "User Management";
   
  }, [router]);

  const [errors, setErrors] = useState({
    UserName: "",
    email: "",
    Password: "",
    Role: "",
    selectedGroups: "",
  });

  // const handleEditorChange = (select) => {
  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     assignedGroups: select ? select.map((item) => item.label) : [], // Update assignedGroups
  //   }));

  //   setSelectedGroups(select);

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     assignedGroups:
  //       select && select.length > 0
  //         ? "" // No error if something is selected
  //         : "At least one group must be selected.", // Error message when nothing is selected
  //   }));
  // };

  // const groups = [
  //   { value: "group1", label: "Group 1 name here" },
  //   { value: "group2", label: "Group 2 name here" },
  //   { value: "group3", label: "Group 3 name here" },
  //   { value: "group4", label: "Group 4 name here" },
  // ];

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
      borderColor: "#999",
      boxShadow: "none",
      padding: "5px 10px",
    }),
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : "This field is required.",
    }
  ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] || (Array.isArray(formValues[key]) && formValues[key].length === 0)) {
        newErrors[key] = "This field is required.";
      }
    });
    if(selectedGroups.length <= 0){
      newErrors.selectedGroups = "This field is requires."
    }
    setErrors(newErrors);

    const [first_name, ...rest] = formValues.UserName.trim().split(" ");
    const last_name = rest.join(" ");

    if (!first_name || !last_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        UserName: "Please provide both first and last names separated by a space.",
      }));
      return;
    }

    
    const payload = {
      first_name,
      last_name,
      email: formValues.email,
      is_active: active,
      role: formValues.Role,
      group_editors_assignment: selectedGroups,
    };

    console.log("Payload", payload);


    try {
      const response = await post('/user_management/create_user_management/', payload);
      console.log(response);
    } catch (error) {
      console.error('Error creating user:', error);
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

    const [first_name, ...rest] = formValues.UserName.trim().split(" ");
    const last_name = rest.join(" ");

    if (!first_name || !last_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        UserName: "Please provide both first and last names separated by a space.",
      }));
      return;
    }

    let id='a33299d1-cfab-4f5e-b070-32c69b517dda';
    
    const payload = {
      first_name,
      last_name,
      email: formValues.email,
      is_active: active,
      role: formValues.Role,
      group_editors_assignment: selectedGroups,
    };

    console.log("Payload", payload);
    try {
      const response = await put(`/user_management/update_user_management/${id}`, payload);
      console.log(response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleRemove = async (e) => {
    e.preventDefault();
   
    let id='a33299d1-cfab-4f5e-b070-32c69b517dda';

    try {
      const response = await del(`/user_management/delete_user_management/${id}`, payload);
      console.log(response);
    } catch (error) {
      console.error('Error delete user:', error);
    }
  }

  const handleEditClick = async(e) =>{
    console.log(e)
    setIsPanelOpen(!isPanelOpen);
    console.log(isPanelOpen)
  }
  
  return (
    <div className={styles.dashboardContainer}>

      <Sidebar isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
      {/* Conditionally applying the class for main content */}
      <Header toggleSidebar={toggleMobileSidebar} />
      <div
        className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
      >
        <div className={styles.pageContent}>

          {/* Group Management Section */}
          <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
              User Management
            </h2>
            <button className={styles.pageButton} onClick={togglePanel}>
              <img src="/images/add_user.svg" alt="Add Group Icon" />
              Add New User
            </button>
          </div>

          {/* Table Content */}
          <div className="mx-2 mb-4">
            <div className="bg-[#1C2546] rounded-[20px] shadow relative">
              <div className={styles.tableSection}>
                <div className={styles.tableContainer + " scrollbar"} id="style-2">
                  <div className={styles.tableContent + " force-overflow p-4 pt-0"}>
                    <Table alerts={users} visibleColumns={columnsConfig.usermanagement} onEditClick={(id) => handleEditClick(id)} />
                  </div>
                </div>
              </div>

              {/* Page Number at Bottom Right */}
              {/* Pagination Section */}
              <div className={styles.pagination + " p-4"}>
                <button
                  className={`${styles.paginationButton} ${styles.active}`}
                >
                  1
                </button>
                <button className={styles.paginationButton}>2</button>
                <button className={styles.paginationButton}>3</button>
                <button className={styles.paginationButton}>...</button>
                <button className={styles.paginationButton}>80</button>
                <button className={styles.paginationButton}>
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
            height: "685px", // Fixed height
            top: "0px", // Position from the top
            left: "998px", // Position from the left
            gap: "20px", // Gap between child elements

            opacity: isPanelOpen ? 1 : 0, // Opacity toggles based on panel state
            transition: "opacity 0.3s ease-in-out" // Smooth opacity transition
          }}
        >
          {/* Header Text */}
          <div className="p-4 pb-0 force-overflow">
            <h2 className="text-white text-[36px]">Add/Edit Group</h2>
          </div>
          {/* Form Content */}
          <div className="p-6 bg-[#1C2546] text-white rounded-b-lg">
            <form onSubmit={handleSubmit}>
              {/* User Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="UserName"
                  className="block text-white text-sm font-medium mb-2"
                >
                  User Name*
                </label>
                <input
                  type="text"
                  id="UserName"
                  placeholder="Enter your user Name here"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.UserName}
                  onChange={handleInputChange}
                />
                {errors.UserName && <span className={styles.error}>{errors.UserName}</span>}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email*
                </label>
                <input
                  id="email"
                  placeholder="You're Email goes here"
                  type="text"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.email}
                  onChange={handleInputChange}
                ></input>
                {errors.email && <span className={styles.error}>{errors.email}</span>}

              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="Password"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Password*
                </label>
                <input
                  id="Password"
                  placeholder="You're Password goes here"
                  type="text"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.Password}
                  onChange={handleInputChange}
                ></input>
                {errors.Password && <span className={styles.error}>{errors.Password}</span>}

              </div>

              {/* User Role Field */}
              <div className="mb-4">
                <label
                  htmlFor="Role"
                  className="block text-white text-sm font-medium mb-2"
                >
                  User Role*
                </label>
                <select
                  id="Role"
                  className="w-full p-3 bg-[#1C2546] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-dark"
                  value={formValues.Role}
                  onChange={handleInputChange}
                >

                  <option value="" disabled select className="">
                    Select User Role

                  </option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.Role && <span className={styles.error}>{errors.Role}</span>}

              </div>

              <div className={styles.field8 + ' mb-4'}>
                <label>Assign Groups*</label>
                <div className={styles.selectWrapper}>
                  <Select
                    isMulti
                    options={groups}
                    value={groups.filter((group) => selectedGroups.includes(group.value))}
                    onChange={(selectedOptions) =>
                      setSelectedGroups(selectedOptions.map((option) => option.value)) // Update selected group IDs
                    }
                    placeholder="Search and select groups"
                    instanceId="assigned-groups-select"
                    classNamePrefix="select"
                    styles={customStyles}
                  />
                  {errors.selectedGroups && (
                    <span className={styles.error}>{errors.selectedGroups}</span>
                  )}
                </div>  
              </div>

              <div className="flex items-center space-x-2 mb-5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={active}
                    onChange={handleToggle}
                  />
                  <div className="w-10 h-6 bg-[#000] rounded-full peer peer-checked:bg-[#4E71F3] transition duration-300"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform duration-300"></div>
                </label>
                <span>{active ? "Active" : "Not Active"}</span>


                <span className="text-white font-medium">Status<span className="text-blue-300">*</span></span>
              </div>

              {/* Submit Button and Clear Button */}
              <div className="mb-4 flex justify-start space-x-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[250px] h-[54px] p-[10px_8px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none"
                >
                  Submit & Save
                </button>

                {/* Clear Button */}
                <button
                  type="button"
                  className="w-[250px] h-[54px] p-[10px_8px] border border-gray-600 text-white font-bold rounded-lg hover:bg-[#2a3b61] focus:outline-none flex items-center justify-center"
                  onClick={() => {
                    setFormValues({
                      UserName: "",
                      email: "",
                      Password: "",
                      Role: "",
                      status: "",
                    });
                    setErrors({});
                  }}
                >
                  {/* Recycle Icon (Rounded cancel logo) */}
                  <span className="mr-2">
                    <img src="/images/clear_logo.svg" alt="Recycle Icon" />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 3h-2v4h2V3zm4 1l-1.5 1.5M7 4 5.5 5.5M6 9h12c1.1 0 1.99.9 1.99 2L20 19c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V11c0-1.1.9-2 2-2zm1.5 6l1.5 1.5-4 4-1.5-1.5 4-4z"
                    />

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