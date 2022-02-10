import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

function UserProfile() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default UserProfile;