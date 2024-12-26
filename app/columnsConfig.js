
const columnsConfig = {
    dashboard: ["title", "description", "ticker", "entryPrice", "exitPrice", "status", "date", "action"],
    groupmanagement: ["groupName", "description", "assignedEditors", "status", "createdDate", "action"],
    logreport: ["date_time", "trade_details", "distribution_channel", "groupName", "editor_name", "action"], 
    database: ["date_time", "trade_details", "distribution_channel", "groupName",  "editor_name","subscriber", "action"], 
    errortype:  ["date_time", "error_type", "description", "groupName", "status", "action"], 
    usermanagement: ["name","email","role","assignedGroups","status","action"]

  };
  
  export default columnsConfig;
  