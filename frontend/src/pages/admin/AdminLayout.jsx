import React from "react";
import {Link, Outlet} from "react-router-dom";

import "../../styles/admin/admin.css";

function AdminLayout() {
    return (
        <div>
            <h2>Back office</h2>
            <div>
                <Link className="action-btn primary" to="/admin/categories">Categories</Link>
                <Link className="action-btn primary" to="/admin/categories">Users</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default AdminLayout;