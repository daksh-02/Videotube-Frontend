import HomePage from "./pages/Homepage.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Sidebar from "./comps/Sidebar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex h-screen ">
          <div className="w-1/5 overflow-y-auto">
            <Sidebar />
          </div>
          <div className="w-4/5  overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
