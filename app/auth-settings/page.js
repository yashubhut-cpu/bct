'use client'

import { useState, useEffect } from 'react'
import styles from './settings.module.css'
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style
import Sidebar from "../component/Sidebar/sidebar";
import { useRouter } from 'next/navigation';
import Header from "../component/Header/header";
import { get, post } from "../api/base"

export default function AuthSettings() {
    const [keepClientId, setKeepClientId] = useState('')
    const [keepClientSecret, setKeepClientSecret] = useState('')
    const [highLevelClientId, setHighLevelClientId] = useState('')
    const [highLevelClientSecret, setHighLevelClientSecret] = useState('')
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
        if (localStorage.getItem("accessToken")) {
            router.push('/auth-settings')
        } else {
            router.push('/')
        }
    }, [router]);

    useEffect(() => {
        console.log("@!#!@#@!#@!")
        fetch_platform_config();
    }, [])


    const fetch_platform_config = async () => {
        const response = await get('/authentication_settings/list_platform_config/');
        console.log("response :: ", response.data)
        if (response && response.data) {
            const keapConfig = response.data.find(config => config.platform_name === 'keap');
            const highLevelConfig = response.data.find(config => config.platform_name === 'go_high_level');

            if (keapConfig) {
                setKeepClientId(keapConfig.client_id || '');
                setKeepClientSecret(keapConfig.client_secret || '');
            }
            if (highLevelConfig) {
                setHighLevelClientId(highLevelConfig.client_id || '');
                setHighLevelClientSecret(highLevelConfig.client_secret || '');
            }
        }

    };

    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(true);

    // Toggle the sidebar collapse state
    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive); // Toggle the state
    }

    const toggleMobileSidebar = () => setIsMobileSidebarActive(!isMobileSidebarActive);

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
                                <button className={styles.saveButton}>Save</button>
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
                                <button className={styles.saveButton} >Save</button>
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
