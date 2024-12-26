"use client";
import { CheckCircleIcon, XCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DocumentIcon from "./DocumentIcon";

const TableRow = ({
  title, date_time, trade_details, distribution_channel, groupName,editor_name,  subscriber, error_type, description, name, email, role, assignedGroups,
  assignedEditors, ticker, entryPrice, exitPrice, status, createdDate, date, visibleColumns
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Active":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "Hold":
        return <XCircleIcon className="w-5 h-5 text-blue-500" />;
      case "Not Active":
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <tr className="my-2 border-b border-gray-600 last:border-b-0">
      {visibleColumns.includes("checkbox") && (
        <td className="py-2 px-4">
          <input type="checkbox" className="cursor-pointer" />
        </td>
      )}
      {visibleColumns.includes("title") && <td className="py-2 px-4"style={{ fontWeight: '500' }}>{title}</td>}
      {visibleColumns.includes("date_time") && (
        <td className="py-2 px-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="cursor-pointer mr-2"
              style={{
                width: '18px',
                height: '18px',
                opacity: '0.70',
                borderRadius: '2px',
                border: '1px #999999 solid',
              }}
            />
            {date_time}
          </div>
        </td>
      )}
      {visibleColumns.includes("trade_details") && <td className="py-2 px-4">{trade_details}</td>}
      {visibleColumns.includes("distribution_channel") && <td className="py-2 px-4">{distribution_channel}</td>}
      {visibleColumns.includes("groupName") && <td className="py-2 px-4">{groupName}</td>}
      {visibleColumns.includes("editor_name") && <td className="py-2 px-4">{editor_name}</td>}
      {visibleColumns.includes("subscriber") && <td className="py-2 px-4">{subscriber}</td>}
      {visibleColumns.includes("error_type") && <td className="py-2 px-4">{error_type}</td>}
      {visibleColumns.includes("description") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{description}</td>}
      {visibleColumns.includes("name") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{name}</td>}
      {visibleColumns.includes("email") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{email}</td>}
      {visibleColumns.includes("role") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{role}</td>}
      {visibleColumns.includes("assignedGroups") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{assignedGroups}</td>}
      {visibleColumns.includes("assignedEditors") && <td className="py-2 px-4">{assignedEditors}</td>}
      {visibleColumns.includes("ticker") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{ticker}</td>}
      {visibleColumns.includes("entryPrice") && <td className="py-2 px-4"style={{ fontWeight: '300' }}>{entryPrice}</td>}
      {visibleColumns.includes("exitPrice") && <td className="py-2 px-4">{exitPrice}</td>}
      {visibleColumns.includes("status") && (
        <td className="py-2 px-4 status-column">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2">{status}</span>
          </div>
        </td>
      )}
      {visibleColumns.includes("createdDate") && <td className="py-2 px-4">{createdDate}</td>}
      {visibleColumns.includes("date") && <td className="py-2 px-4">{date}</td>}
      {visibleColumns.includes("action") && (
        <td className="py-1 px-1 action-row">
          <div className="flex flex-row justify-around">
          <DocumentIcon className="w-5 h-5 cursor-pointer text-blue-400 hover:text-blue-500" />
          <PencilIcon className="w-5 h-5 cursor-pointer text-green-400 hover:text-green-500" />
          <TrashIcon className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-500" />
          </div>        
        </td>
        
      )}
    </tr>
  );
};

const Table = ({ alerts, visibleColumns }) => {
  return (
    <table className="w-full text-left text-sm text-white">
      <thead>
        <tr>
          {visibleColumns.includes("checkbox") && (
            <th className="border-b py-2">
              <input type="checkbox" className="cursor-pointer" />
            </th>
          )}
          {visibleColumns.includes("title") && <th className="border-b py-2">TRADE TITLE</th>}
          {visibleColumns.includes("date_time") && (
            <th className="border-b py-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="cursor-pointer mr-2"
                  style={{
                    width: '18px',
                    height: '18px',
                    opacity: '0.70',
                    borderRadius: '2px',
                    border: '1px #999999 solid',
                  }}
                />
                DATE & TIME
              </div>
            </th>
          )}
          {visibleColumns.includes("trade_details") && <th className="border-b py-2">TRADE DETAILS</th>}
          {visibleColumns.includes("distribution_channel") && <th className="border-b py-2">DISTRIBUTION CHANNEL</th>}
          {visibleColumns.includes("groupName") && <th className="border-b py-2">GROUP NAME</th>}
          {visibleColumns.includes("editor_name") && <th className="border-b py-2">EDITOR NAME/ID</th>}
          {visibleColumns.includes("subscriber") && <th className="border-b py-2">SUBSCRIBER</th>}
          {visibleColumns.includes("error_type") && <th className="border-b py-2">ERROR TYPE</th>}
          {visibleColumns.includes("description") && <th className="border-b py-2">DESCRIPTION</th>}
          {visibleColumns.includes("name") && <th className="border-b py-2">NAME</th>}
          {visibleColumns.includes("email") && <th className="border-b py-2">EMAIL</th>}
          {visibleColumns.includes("role") && <th className="border-b py-2">ROLE</th>}
          {visibleColumns.includes("assignedGroups") && <th className="border-b py-2">ASSIGNED GROUPS</th>}
          {visibleColumns.includes("assignedEditors") && <th className="border-b py-2">ASSIGNED EDITORS</th>}
          {visibleColumns.includes("ticker") && <th className="border-b py-2">TICKER SYMBOL</th>}
          {visibleColumns.includes("entryPrice") && <th className="border-b py-2">ENTRY PRICE</th>}
          {visibleColumns.includes("exitPrice") && <th className="border-b py-2">EXIT PRICE</th>}
          {visibleColumns.includes("status") && <th className="border-b py-2">STATUS</th>}
          {visibleColumns.includes("createdDate") && <th className="border-b py-2">CREATED DATE</th>}
          {visibleColumns.includes("date") && <th className="border-b py-2">DATE</th>}
          {visibleColumns.includes("action") && <th className="border-b py-2">ACTION</th>}
        </tr>
      </thead>

      <tbody className="space-y-2">
        {alerts.map((alert, index) => (
          <TableRow
            key={index}
            title={alert.title}
            date_time={alert.date_time}
            trade_details={alert.trade_details}
            distribution_channel={alert.distribution_channel}
            groupName={alert.groupName}
            editor_name={alert.editor_name}
            subscriber={alert.subscriber}
            error_type={alert.error_type}
            description={alert.description}
            name={alert.name}
            email={alert.email}
            role={alert.role}
            assignedGroups={alert.assignedGroups}
            assignedEditors={alert.assignedEditors}
            ticker={alert.ticker}
            entryPrice={alert.entryPrice}
            exitPrice={alert.exitPrice}
            createdDate={alert.createdDate}
            status={alert.status}
            date={alert.date}
            visibleColumns={visibleColumns}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;






































