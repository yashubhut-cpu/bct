'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import styles from './settings.module.css'
import Sidebar from "../component/Sidebar/sidebar";


export default function AuthSettings() {
    const [keepClientId, setKeepClientId] = useState('Basecore_noahg23')
    const [keepClientSecret, setKeepClientSecret] = useState('ubc52445Y2590bh4hOFQBSvvvY2ubc52445Y2590bh4hOFQBSvvvY2')
    const [highLevelClientId, setHighLevelClientId] = useState('Basecore_noahg222')
    const [highLevelClientSecret, setHighLevelClientSecret] = useState('9e8f7b65b64d3a2f9b2b54969fbbop9e8f7b65b64d3a2f9b2b54969fbbop')

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={styles.dashboardContainer}>

            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={handleSidebarToggle} />
            <div
                className={`${styles.mainContent} ${isSidebarCollapsed ? styles.collapsed : styles.expanded
                    }`}
            >
                <div className={styles.mainContent}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Authentication Settings</h1>

                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <img src="./images/Keap-logo.svg" alt="Keep" className={styles.logo} />
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
                                        type="text"
                                        value={keepClientSecret}
                                        onChange={(e) => setKeepClientSecret(e.target.value)}
                                    />
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => copyToClipboard(keepClientSecret)}
                                    >
                                        <Copy size={16} />
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
                                        type="text"
                                        value={highLevelClientSecret}
                                        onChange={(e) => setHighLevelClientSecret(e.target.value)}
                                    />
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => copyToClipboard(highLevelClientSecret)}
                                    >
                                        <Copy size={16} />
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
                    </div>
                </div>
            </div>
        </div>
    )
}

