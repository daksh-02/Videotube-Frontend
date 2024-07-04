import React, { useState } from "react";
import Navbar from "./navbar/Navbar.jsx";
import Sidebar from "./comps/Sidebar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex h-screen transition-all duration-500">
          <div
            className={`transition-all duration-500 ${
              isExpanded ? "w-64" : "w-20"
            }`}
          >
            <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
