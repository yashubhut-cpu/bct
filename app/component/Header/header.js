"use client";
import styles from "../Header/header.module.css";
import Image from "next/image";


export default function Header() {


    return (
        <div className={styles.header}>
            <div className={styles.headerSection}>
                {/* <div className={styles.searchbar}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className={styles.searchIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3 7.5 7.5 0 0116.65 16.65z"
                            />
                        </svg>
                    </div>
                </div> */}
                {/* Profile Section (Name + Image) */}
                <div className={styles.profileSection}>
                    Bell Icon
                    <div className="relative">
                        <Image
                            src="/images/bell-icon.svg" // Replace with the actual path of the bell icon
                            alt="Bell Icon"
                            width={20}
                            height={20}
                            className="text-white"
                        />
                        <span className="absolute -top-1 -right-1 text-xs text-red-500 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                            3
                        </span>{" "}
                        {/* Badge for notifications */}
                    </div>
                    <div className="relative">
                        <Image
                            src="images/email-icon.svg" // Replace with the actual path of the email icon
                            alt="Email Icon"
                            width={20}
                            height={20}
                            className="text-white"
                        />
                        <span className="absolute -top-1 -right-1 text-xs text-red-500 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                            1
                        </span>{" "}
                        {/* Badge for unread emails */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}