import { Outlet } from "react-router-dom";

function Layout({ theme }) {
    return (
        <div className={theme === "dark" ? "dark" : "light"}>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;