"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "../Sidebar/sidebar.module.css";

const menuItems = [
    { name: "Dashboard", icon: "/images/home.svg", href: "/dashboard" },
    { name: "Input Trade Alert", icon: "/images/trade-alert.svg", href: "/inputtradealert" },
    { name: "Group Management", icon: "/images/group.svg", href: "/groupmanagement" },
    { name: "Logs & Reports", icon: "/images/logs.svg", href: "/logs&report" },
    { name: "Database Viewer", icon: "/images/database.svg", href: "/databaseviewer" },
    { name: "Error Notifications", icon: "/images/error.svg", href: "/errornotification" },
    { name: "User Management", icon: "/images/user-management.svg", href: "/usermanagement" },
    { name: "Settings", icon: "/images/settings.svg", href: "/auth-settings" },
    { name: "Logout", icon: "/images/logout.svg", href: "#" },
];

export default function Sidebar({ isCollapsed, toggleSidebar }) {
    const pathname = usePathname();
    // const [isCollapsed, setIsCollapsed] = useState(false);

    // const toggleSidebar = () => {
    //     const newState = !isCollapsed;
    //     setIsCollapsed(newState);
    // };

    return (
        <div className={`${styles.mainContainer} ${isCollapsed ? styles.collapsed : ''}`}>
            <button className={styles.toggleButton} onClick={toggleSidebar}>
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {!isCollapsed && (
                <div className={styles.logo}>
                    <Image
                        src="/images/bct_small.svg"
                        alt="Base Camp Trading Logo"
                        width={135}
                        height={40}
                    />
                </div>
            )}

            {isCollapsed && (
                <div className={styles.menuIconContainer}>
                    <Image
                        src="/images/bct_small_1.png" // Replace this path with your image
                        alt="Menu Icon"
                        width={30} // Adjust dimensions to match your image
                        height={30}
                    />
                </div>
            )}


            <hr className={styles.divider} />

            <div className={styles.sideBarTitle}>
                {menuItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div
                            className={`${styles.menuItem} ${pathname === item.href ? styles.menuItemActive : ''
                                }`}
                        >
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={20}
                                height={20}
                                className={styles.menuItemIcon}
                                style={{
                                    filter: pathname === item.href ? "brightness(0) invert(1)" : "none",
                                }}
                            />
                            {!isCollapsed && <span className={styles.menuItemText}>{item.name}</span>}
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.profileSection}>
                <Image
                    src="/images/profile_pic.svg"
                    alt="Profile Image"
                    width={40}
                    height={40}
                    className={styles.profileImage}
                />
                {!isCollapsed && <span className={styles.profileName}>Web App</span>}
            </div>
        </div>
    );
}

