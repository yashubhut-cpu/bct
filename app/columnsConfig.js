const columnsConfig = {
  dashboard: [
    "id",
    "title",
    "description",
    "ticker",
    "entryPrice",
    "exitPrice",
    "date_time",
    "action",
    "eye",
  ],
  groupmanagement: (role) => {
    const baseColumns = [
      "groupName",
      "description",
      "assignedEditors",
      "status",
      "createdDate",
      "action",
    ];
    if (role === "editor") {
      return [...baseColumns, "eye"]; // Editor sees only "eye"
    }
    return [...baseColumns, "edit", "delete"]; // Admin sees "edit" and "delete" (default)
  },
  logreport: [
    "id",
    "checkbox",
    "date_time",
    "trade_details",
    "distribution_channel",
    "groupName",
    "editor_name",
    "action",
    "eye",
  ],
  errortype: [
    "id",
    "customer_name",
    "error_type",
    "description",
    "affected_channel",
    "status",
    "date_time",
  ],
  usermanagement: [
    "id",
    "name",
    "email",
    "role",
    "assignedGroups",
    "status",
    "action",
    "edit",
    "delete",
    "update password",
  ],
};

export default columnsConfig;
