"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../Sidebar/sidebar.module.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: "/images/home.svg", href: "/dashboard" },
  {
    name: "Input Trade Alert",
    icon: "/images/trade-alert.svg",
    href: "/input_trade_alert",
  },
  {
    name: "Group Management",
    icon: "/images/group.svg",
    href: "/group_management",
  },
  { name: "Logs & Reports", icon: "/images/logs.svg", href: "/logs_report" },
  {
    name: "User Management",
    icon: "/images/user-management.svg",
    href: "/user_management",
  },
  {
    name: "Tags Management",
    icon: "/images/tag-icon.svg",
    href: "/tags_management",
  },
  { name: "Settings", icon: "/images/settings.svg", href: "/auth_settings" },
];

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  isMobileActive,
  closeSidebar,
}) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const fetchUserData = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      try {
        const decodedToken = jwtDecode(accessToken);
        const { first_name, last_name } = decodedToken;
        setUserName(`${first_name} ${last_name}`);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`${styles.mainContainer} ${
        isCollapsed ? styles.collapsed : ""
      } ${isMobileActive ? styles.mobileActive : ""}`}
    >
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {!isCollapsed && (
        <div className={styles.logo}>
          <Link href="/dashboard">
            <Image
              src="/images/bct_small.svg"
              alt="Base Camp Trading Logo"
              width={135}
              height={40}
              loading="lazy"
              className="cursor-pointer"
            />
          </Link>
          <button
            className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-[30px]"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>
      )}

      {isCollapsed && (
        <div className={styles.menuIconContainer}>
          <Link href="/dashboard">
            <Image
              src="/images/bct_small_1.png"
              alt="Menu Icon"
              width={30}
              height={30}
              loading="lazy"
              className="cursor-pointer"
            />
          </Link>
        </div>
      )}

      <hr className={styles.divider} />

      <ul className={styles.sideBarTitle + ""}>
        {menuItems.map((item) => (
          <li className={styles.border_active} key={item.name}>
            <Link href={item.href}>
              <div
                className={`${styles.menuItem} ${
                  pathname === item.href ? styles.menuItemActive : ""
                }`}
                style={{
                  borderRight:
                    pathname === item.href ? "4px solid #5177FF" : "none",
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className={styles.menuItemIcon}
                  style={{
                    filter:
                      pathname === item.href
                        ? "brightness(0) invert(1)"
                        : "none",
                  }}
                />
                {!isCollapsed && (
                  <span className={styles.menuItemText}>{item.name}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.profileSection} onClick={toggleDropdown}>
        <Image
          src="/images/profile_pic.svg"
          alt="Profile Image"
          width={40}
          height={40}
          className={styles.profileImage}
        />
        {!isCollapsed && <span className={styles.profileName}>{userName}</span>}
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <Link
              href={"/"}
              className={styles.dropdownItem}
              onClick={handleLogout}
            >
              <Image
                src="./images/logout.svg"
                alt="Logout"
                width={20}
                height={20}
                className={styles.menuItemIcon}
              />
              <span className={styles.logoutSidebar}>Logout</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
