import React from "react";
import { Outlet } from "react-router-dom";

import "../../styles/admin/admin.css";

function AdminLayout() {
  return (
    <div className="admin-grid">
      <div className="admin-grid-left">
        <span>ADMIN</span>
      </div>

      <div className="admin-grid-right">
        <div className="admin-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
