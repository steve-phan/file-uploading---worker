import React, { useEffect, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import { routes } from "./routes/routes";
import { StickyProgressBar } from "./components/StickyProgressBar";
import "./index.css";

const Layout: React.FC = () => {
  const links = routes.filter((route) => !route.hiddenInHeader);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": "hallo",
        },
      });
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between bg-pink-500 text-white p-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">My App</h1>
        </div>
        <div className="flex justify-between gap-4">
          {links.map((route) => (
            <div key={route.title}>
              <Link to={route.path}> {route.title}</Link>
            </div>
          ))}
        </div>
      </header>

      <main className="flex-grow p-8 bg-gray-100">
        <Outlet />
      </main>

      <StickyProgressBar />

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
