"use client";
import styles from "../Header/header.module.css";
import Image from "next/image";

export default function Header({ toggleSidebar }) {

    return (
        <div className={styles.header}>
            <div className={styles.headerSection}>

                <div className={styles.searchIcon}>
                    <Image
                        src="/images/bct_small.svg" // Replace with the actual path of the bell icon
                        alt="Bell Icon"
                        width={150}
                        height={20}
                        className="text-white"
                        loading="lazy"
                    />
                </div>

                {/* Profile Section (Name + Image) */}
                <div className={styles.profileSection}>
                    <button
                        className={styles.menuButton}
                        onClick={toggleSidebar}
                        aria-label="Navigate to Sidebar"
                    >
                        <img
                            src="./images/menu.svg"
                            alt="Navigate to Sidebar"
                            className={styles.menuIcon}
                        />
                    </button>
                </div>
            </div>
        </div >
    );
}