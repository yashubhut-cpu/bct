"use client";
import styles from "../Header/header.module.css";
import Image from "next/image";

export default function Header({ toggleSidebar }) {

    return (
        <div className={styles.header}>
            <div className={styles.headerSection}>

                {/* <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}
                <div className={styles.searchIcon}>
                    <Image
                        src="/images/bct_small.svg" // Replace with the actual path of the bell icon
                        alt="Bell Icon"
                        width={150}
                        height={20}
                        className="text-white"
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