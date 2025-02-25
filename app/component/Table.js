"use client";
import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { MdLockReset } from "react-icons/md";
import React from "react";
import styles from "./table.module.css";
import Loading from "./loading";

const Checkbox = ({ id, checked, onChange }) => {
  return (
    <div className={styles.checkBoxContainer}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}></label>
    </div>
  );
};

const DateTime = ({ date_time }) => {
  return (
    <div className="flex items-center">
      <span>{date_time}</span>
    </div>
  );
};

function formatDateToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const Table = ({
  alerts,
  visibleColumns,
  onEditClick,
  onDeleteClick,
  onPasswordResetClick,
  onEyeIconClick,
  loading,
  selectedRows = new Set(),
  onRowChange,
  onSelectAll,
  isAllSelected,
}) => {
  return (
    <div>
      <table className="w-full text-left text-sm text-white">
        {/* Table Header - Always Visible */}
        <thead className="sticky top-0 z-10" style={{ background: "#1C2546" }}>
          <tr>
            {visibleColumns.includes("checkbox") && (
              <th className="border-b">
                <Checkbox
                  id={"selectAll"}
                  checked={isAllSelected}
                  onChange={onSelectAll}
                />
              </th>
            )}
            {visibleColumns.includes("title") && (
              <th className="border-b">TRADE TITLE</th>
            )}
            {visibleColumns.includes("customer_name") && (
              <th className="border-b">CUSTOMER NAME</th>
            )}
            {visibleColumns.includes("trade_details") && (
              <th className="border-b">TRADE DETAILS</th>
            )}
            {visibleColumns.includes("distribution_channel") && (
              <th className="border-b">DISTRIBUTION CHANNEL</th>
            )}
            {visibleColumns.includes("groupName") && (
              <th className="border-b">GROUP NAME</th>
            )}
            {visibleColumns.includes("editor_name") && (
              <th className="border-b">EDITOR NAME/ID</th>
            )}
            {visibleColumns.includes("error_type") && (
              <th className="border-b">ERROR TYPE</th>
            )}
            {visibleColumns.includes("description") && (
              <th className="border-b">DESCRIPTION</th>
            )}
            {visibleColumns.includes("name") && (
              <th className="border-b">NAME</th>
            )}
            {visibleColumns.includes("email") && (
              <th className="border-b">EMAIL</th>
            )}
            {visibleColumns.includes("role") && (
              <th className="border-b">ROLE</th>
            )}
            {visibleColumns.includes("assignedGroups") && (
              <th className="border-b">ASSIGNED GROUPS</th>
            )}
            {visibleColumns.includes("assignedEditors") && (
              <th className="border-b">ASSIGNED EDITORS</th>
            )}
            {visibleColumns.includes("ticker") && (
              <th className="border-b">TICKER SYMBOL</th>
            )}
            {visibleColumns.includes("entryPrice") && (
              <th className="border-b">ENTRY PRICE</th>
            )}
            {visibleColumns.includes("exitPrice") && (
              <th className="border-b">EXIT PRICE</th>
            )}
            {visibleColumns.includes("affected_channel") && (
              <th className="border-b">AFFECTED CHANNEL</th>
            )}
            {visibleColumns.includes("status") && (
              <th className="border-b">STATUS</th>
            )}
            {visibleColumns.includes("date_time") && (
              <th className="border-b">
                <DateTime date_time="DATE & TIME" />
              </th>
            )}
            {visibleColumns.includes("createdDate") && (
              <th className="border-b">CREATED DATE</th>
            )}
            {visibleColumns.includes("date") && (
              <th className="border-b">DATE</th>
            )}
            {visibleColumns.includes("action") && (
              <th className="border-b">ACTION</th>
            )}
          </tr>
        </thead>

        {/* Table Body - Conditional Rendering */}
        <tbody className="space-y-2">
          {loading ? (
            <tr>
              <td colSpan={visibleColumns.length} className="text-center py-4">
                <Loading position="top" />
              </td>
            </tr>
          ) : (
            alerts.map((alert, index) => (
              <TableRow
                key={alert.id || index}
                id={alert.id}
                checked={selectedRows.has(alert.id)}
                onChange={() => onRowChange(alert.id)}
                title={alert.title}
                trade_details={alert.trade_details}
                distribution_channel={alert.distribution_channel}
                groupName={alert.group_name}
                editor_name={alert.editor_name}
                customer_name={alert.customer_name}
                error_type={alert.error_type}
                description={alert.description}
                name={`${alert.first_name} ${alert.last_name}`}
                email={alert.email}
                role={alert.role}
                assignedGroups={alert.group}
                assignedEditors={alert.editor_assigned_groups}
                ticker={alert.ticker}
                entryPrice={alert.entryPrice}
                exitPrice={alert.exitPrice}
                affected_channel={alert.affected_channel}
                createdDate={alert.created_at}
                status={alert.is_active || alert.status}
                date_time={alert.date_time}
                date={alert.date}
                visibleColumns={visibleColumns}
                apiID={alert.id}
                onEditClick={() => onEditClick(alert.id, alert)}
                onDeleteClick={() => onDeleteClick(alert.id)}
                onPasswordResetClick={() => onPasswordResetClick(alert.id)}
                onEyeIconClick={() => onEyeIconClick(alert.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({
  id,
  title,
  date_time,
  trade_details,
  distribution_channel,
  groupName,
  customer_name,
  editor_name,
  error_type,
  description,
  name,
  email,
  role,
  assignedGroups,
  assignedEditors,
  ticker,
  entryPrice,
  exitPrice,
  affected_channel,
  status,
  createdDate,
  date,
  visibleColumns,
  checked,
  onChange,
  onEditClick,
  onDeleteClick,
  onPasswordResetClick,
  onEyeIconClick,
  apiID,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case true:
        return (
          <div className="flex items-center space-x-1">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-white">Active</span>
          </div>
        );
      case false:
        return (
          <div className="flex items-center space-x-1">
            <XCircleIcon className="min-w-5 h-5 text-red-500" />
            <span className="text-white">In Active</span>
          </div>
        );
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "hold":
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case "scheduled":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "queued":
        return (
          <img src="/images/Queued.svg" alt="Queued" className="w-5 h-5" />
        );
      case "failed":
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return (
          <div className="flex items-center space-x-1">
            <XCircleIcon className="min-w-5 h-5 text-red-500" />
            <span className="text-white">In Active</span>
          </div>
        );
    }
  };

  return (
    <tr className="my-2 border-b border-gray-500 last:border-b-0">
      {visibleColumns.includes("checkbox") && (
        <td>
          <Checkbox id={id} checked={checked} onChange={onChange} />
        </td>
      )}
      {visibleColumns.includes("title") && (
        <td style={{ fontWeight: "500", color: "#fff" }}>{title}</td>
      )}

      {visibleColumns.includes("trade_details") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "500", color: "#fff" }}
        >
          {trade_details}
        </td>
      )}
      {visibleColumns.includes("distribution_channel") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {distribution_channel}
        </td>
      )}
      {visibleColumns.includes("groupName") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "500", color: "#fff" }}
        >
          {groupName}
        </td>
      )}
      {visibleColumns.includes("editor_name") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {editor_name}
        </td>
      )}
      {visibleColumns.includes("customer_name") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "500", color: "#fff" }}
        >
          {" "}
          {customer_name}
        </td>
      )}

      {visibleColumns.includes("error_type") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "500", color: "#fff" }}
        >
          {error_type}
        </td>
      )}
      {visibleColumns.includes("description") && (
        <td
          className="max-w-64 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {description}
        </td>
      )}
      {visibleColumns.includes("name") && (
        <td
          className="max-w-64 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
          aria-valuetext={id}
        >
          {name}
        </td>
      )}
      {visibleColumns.includes("email") && (
        <td style={{ fontWeight: "100", color: "#ffffff" }}>{email}</td>
      )}
      {visibleColumns.includes("role") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {role}
        </td>
      )}
      {visibleColumns.includes("assignedGroups") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {" "}
          {assignedGroups.map((group, index) => (
            <div key={index}>{group.group.group_name}</div>
          ))}
        </td>
      )}
      {visibleColumns.includes("assignedEditors") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {assignedEditors.map((group, index) => (
            <div
              key={index}
            >{`${group?.editor?.first_name} ${group?.editor?.last_name}`}</div>
          ))}
        </td>
      )}
      {visibleColumns.includes("ticker") && (
        <td style={{ fontWeight: "100", color: "#ffffff" }}>{ticker}</td>
      )}
      {visibleColumns.includes("entryPrice") && (
        <td style={{ fontWeight: "100", color: "#ffffff" }}>{entryPrice}</td>
      )}
      {visibleColumns.includes("exitPrice") && (
        <td style={{ fontWeight: "100", color: "#ffffff" }}>{exitPrice}</td>
      )}
      {visibleColumns.includes("affected_channel") && (
        <td
          className="max-w-64 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {affected_channel}
        </td>
      )}
      {visibleColumns.includes("status") && (
        <td className="status-column">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2" style={{ fontWeight: "500", color: "#fff" }}>
              {status}
            </span>
          </div>
        </td>
      )}

      {visibleColumns.includes("date_time") && (
        <td
          className="max-w-64 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          <DateTime date_time={date_time} />
        </td>
      )}

      {visibleColumns.includes("createdDate") && (
        <td
          className="max-w-48 truncate"
          style={{ fontWeight: "100", color: "#ffffff" }}
        >
          {formatDateToDDMMYYYY(createdDate)}
        </td>
      )}

      {visibleColumns.includes("date") && (
        <td style={{ fontWeight: "100", color: "#ffffff" }}>{date}</td>
      )}

      {visibleColumns.includes("action") && (
        <td className="py-1 px-1 action-row">
          <div className="flex flex-row justify-around column-container">
            {visibleColumns.includes("eye") && (
              <div className="column">
                <EyeIcon
                  className="w-5 h-5 cursor-pointer text-[#5177FF] hover:text-[#5177FF]"
                  onClick={() => onEyeIconClick(apiID)}
                />
              </div>
            )}
            {visibleColumns.includes("edit") && (
              <div className="column">
                <PencilIcon
                  className="w-5 h-5 cursor-pointer text-green-400 hover:text-green-500"
                  onClick={() => onEditClick(apiID)}
                />
              </div>
            )}
            {visibleColumns.includes("delete") && (
              <div className="column">
                <TrashIcon
                  className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-500"
                  onClick={() => onDeleteClick(apiID)}
                />
              </div>
            )}
            {visibleColumns.includes("update password") && (
              <div className="column">
                <MdLockReset
                  className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-500"
                  onClick={() => onPasswordResetClick(apiID)}
                />
              </div>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default Table;
