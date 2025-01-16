
const columnsConfig = {
    dashboard: ["title", "description", "ticker", "entryPrice", "exitPrice", "status", "date", "action", "eye"], 
    groupmanagement: ["groupName", "description", "assignedEditors", "status", "createdDate", "action","edit", "delete"],
    logreport: ["checkbox","date_time", "trade_details", "distribution_channel", "groupName", "editor_name", "action", "eye"], 
    errortype:  ["date_time", "error_type", "description", "affected_channel", "status", "action", "eye"], 
    usermanagement: ["id","name","email","role","assignedGroups","status","action", "edit", "delete"]

  };
  
  export default columnsConfig;
  