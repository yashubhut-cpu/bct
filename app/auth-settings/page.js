'use client'

import { useState, useEffect } from 'react'
import styles from './settings.module.css'
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Sidebar from "../component/Sidebar/sidebar";
import { useRouter } from 'next/navigation';
import Header from "../component/Header/header";


export default function AuthSettings() {
    const [keepClientId, setKeepClientId] = useState('Basecore_noahg23')
    const [keepClientSecret, setKeepClientSecret] = useState('ubc52445Y2590bh4hOFQBSvvvY2ubc52445Y2590bh4hOFQBSvvvY2')
    const [highLevelClientId, setHighLevelClientId] = useState('Basecore_noahg222')
    const [highLevelClientSecret, setHighLevelClientSecret] = useState('9e8f7b65b64d3a2f9b2b54969fbbop9e8f7b65b64d3a2f9b2b54969fbbop')
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleSidebarToggle = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const [isKeapSecretVisible, setKeapSecretVisible] = useState(false);
    const [isHighLevelSecretVisible, setHighLevelSecretVisible] = useState(false);

    const toggleKeapSecretVisibility = () => {
        setKeapSecretVisible(!isKeapSecretVisible);
    };

    const toggleHighLevelSecretVisibility = () => {
        setHighLevelSecretVisible(!isHighLevelSecretVisible);
    };
    const router = useRouter();

    useEffect(() => {
        document.title = "Auth-Settings";
       
    }, [router]);


    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

    // Toggle the sidebar collapse state
    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive); // Toggle the state
    }

    const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);






    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetch('https://bct-trade-alert-backend-production.up.railway.app/authentication_settings/list_platform_config/')
            .then(response => response.json())
            .then(data => {
                setKeepClientId(data.keepClientId);
                setKeepClientSecret(data.keepClientSecret);
                setHighLevelClientId(data.highLevelClientId);
                setHighLevelClientSecret(data.highLevelClientSecret);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to handle saving data
    const handleSave = () => {
        const data = {
            platform_name: "keap",
            client_id: "client_id",
            client_secret: "client_secret"
        };

        fetch('https://bct-trade-alert-backend-production.up.railway.app/authentication_settings/create_update_platform_config/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MzA5NTkzLCJpYXQiOjE3MzUyOTczNDcsImp0aSI6IjlmMGNhNmM1MThiMDQzYmY5MDUyOGZmMzM1OWE2YTI0IiwidXNlcl9pZCI6Ijk3NDQ2NGMxLWFjYjAtNDM4Mi1iNGQ2LTRjMGZmNWNlYjM1YiJ9.ZoFZksWwXlfPEnJWvPFC7-JXZmFtLbur0NiNLzZSEWo', // Replace with the actual token
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        console.error('API Error:', error);
                        alert('Failed to save data: ' + JSON.stringify(error));
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                alert('Data saved successfully!');
            })
            .catch((error) => console.error('Network Error:', error));
    };




    return (
        <div className={styles.dashboardContainer}>
            <Sidebar isCollapsed={isSidebarActive} toggleSidebar={toggleSidebar} isMobileActive={isMobileSidebarActive} />
            {/* Conditionally applying the class for main content */}
            <Header toggleSidebar={toggleMobileSidebar} />
            <div
                className={`${isSidebarActive ? styles.mainContent : styles.sidebarActive}`}
            >
                <div className={styles.pageContent}>
                    <div className="flex justify-between items-center title-space mr-4 ml-4 mb-3">
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2.25xl text-white mt-4 mb-3 sm:w-auto">
                            Authentication Settings
                        </h2>
                    </div>
                    <div className={styles.container + " mx-2 mb-3"}>
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <img src="./images/Keap-logo.svg" alt="Keap" className={styles.logo} />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Keap Client Id*</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        value={keepClientId}
                                        onChange={(e) => setKeepClientId(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Keap Client Secret*</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type={isKeapSecretVisible ? 'text' : 'password'}
                                        value={keepClientSecret}
                                        onChange={(e) => setKeepClientSecret(e.target.value)}
                                    />
                                    <button className={styles.copyButton} onClick={toggleKeapSecretVisibility}>
                                        <img src="./images/key_icon.svg" alt="Toggle Keap Secret Visibility" />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button className={styles.saveButton} onClick={handleSave}>Save</button>
                                <button className={styles.testButton}>
                                    <span className={styles.testIcon}>⚡</span>
                                    Test Connection
                                </button>
                            </div>
                        </div>

                        <div className={styles.section2}>
                            <div className={styles.sectionHeader}>
                                <img src="./images/highleval.svg" alt="HighLevel" className={styles.logo} />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>GoHighLevel Client ID*</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        value={highLevelClientId}
                                        onChange={(e) => setHighLevelClientId(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>GoHighLevel Client Secret*</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type={isHighLevelSecretVisible ? 'text' : 'password'}
                                        value={highLevelClientSecret}
                                        onChange={(e) => setHighLevelClientSecret(e.target.value)}
                                    />
                                    <button className={styles.copyButton} onClick={toggleHighLevelSecretVisibility}>
                                        <img src="./images/key_icon.svg" alt="Toggle HighLevel Secret Visibility" />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button className={styles.saveButton} onClick={handleSave}>Save</button>
                                <button className={styles.testButton}>
                                    <span className={styles.testIcon}>⚡</span>
                                    Test Connection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
