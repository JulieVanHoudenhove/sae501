import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

import "../../styles/admin/admin.css";
import Login from "./Login.jsx";

function AdminLayout() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(localStorage.getItem('access_token'));
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
        location.href = '/admin';
    }

  return (
    <div className="admin-grid">
      <div className="admin-grid-left">
        <span>ADMIN</span>
      </div>

      <div className="admin-grid-right">
        <div className="admin-outlet">
            {currentUser ? (
                    <a onClick={logout} className="admin-back">Logout</a>
                ) : (
                    <></>
                )
            }

            {currentUser ? (
                    <Outlet />
                ) : (
                    <Login />
                )
            }
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
