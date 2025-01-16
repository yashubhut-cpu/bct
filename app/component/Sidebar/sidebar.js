"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "../Sidebar/sidebar.module.css";

const menuItems = [
    { name: "Dashboard", icon: "/images/home.svg", href: "/dashboard" },
    { name: "Input Trade Alert", icon: "/images/trade-alert.svg", href: "/inputtradealert" },
    { name: "Group Management", icon: "/images/group.svg", href: "/groupmanagement" },
    { name: "Logs & Reports", icon: "/images/logs.svg", href: "/logs&report" },
    { name: "Error Notifications", icon: "/images/error.svg", href: "/errornotification" },
    { name: "User Management", icon: "/images/user-management.svg", href: "/usermanagement" },
    { name: "Settings", icon: "/images/settings.svg", href: "/auth-settings" },
];


export default function Sidebar({ isCollapsed, toggleSidebar, isMobileActive }) {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    // export default function Sidebar() {
    //     const [isCollapsed, setIsCollapsed] = useState(() => {
    //       return localStorage.getItem("isSidebarCollapsed") === "true";
    //     });

    //     const pathname = usePathname();

    //     useEffect(() => {
    //       localStorage.setItem("isSidebarCollapsed", isCollapsed);  
    //     }, [isCollapsed]);

    //     const toggleSidebar = () => {
    //       setIsCollapsed((prevState) => !prevState);
    //     };


    return (
        <div
            className={`${styles.mainContainer} ${
                isCollapsed ? styles.collapsed : ''
                } ${isMobileActive ? styles.mobileActive : ''}`}
        >
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
                    <button
                        className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-[30px]"
                    // onClick={toggleSidebar}
                    >
                        ✕ {/* Unicode character for "X" */}
                    </button>

                </div>

            )}


            {isCollapsed && (
                <div className={styles.menuIconContainer}>
                    <Image
                        src="/images/bct_small_1.png"
                        alt="Menu Icon"
                        width={30}
                        height={30}
                    />
                </div>
            )}

            <hr className={styles.divider} />

            <ul className={styles.sideBarTitle + ""}>
                {menuItems.map((item) => (
                    <li className={styles.border_active} key={item.name}>
                        <Link href={item.href}>
                            <div
                                className={`${styles.menuItem} ${pathname === item.href ? styles.menuItemActive : ''}`}
                                style={{
                                    borderRight: pathname === item.href ? "4px solid #5177FF" : "none",
                                }}>
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
                    </li>
                ))}
            </ul>

            <Link
                href={"/"} className={styles.menuItem} onClick={handleLogout}>
                <Image src="./images/logout.svg"
                    alt="Logout"
                    width={20}
                    height={20}
                    className={styles.menuItemIcon}
                />Logout
            </Link>


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