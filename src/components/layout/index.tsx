import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useApp } from "../../context/AppContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { darkMode } = useApp();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);

  return (
    <div
      className={darkMode ? "dark" : ""}
      style={{ display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{
          background: "var(--bg-primary)",
          transition: "background 0.3s",
        }}
      >
        <Navbar onMenuToggle={() => setCollapsed((c) => !c)} />
        <main className="flex flex-col flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
