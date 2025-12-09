/* SidebarLinks.jsx */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";

export function SidebarLinks({ routes }) {
  const location = useLocation();

  /**
   * Check if the given route is currently active
   * - Uses startsWith so `/provider/schedule/history` still activates `/provider/schedule`
   */
  const activeRoute = (fullPath) => {
    return location.pathname.startsWith(fullPath);
  };

  /**
   * Filters and creates sidebar <Link> elements
   * - Only includes routes where `showInSidebar !== false`
   * - Only shows routes belonging to the current layout (admin/provider)
   */
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      // Skip routes explicitly hidden from sidebar
      if (route.showInSidebar === false) return null;

      // Build full route path: "/admin/users" or "/provider/schedule"
      const fullPath = `${route.layout}/${route.path}`;

      // Only render routes that belong to the current layout
      if (!location.pathname.startsWith(route.layout)) return null;

      return (
        <Link key={index} to={fullPath}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
              key={index}
            >
              {/* Sidebar icon */}
              <span
                className={`${
                  activeRoute(fullPath)
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.icon ? route.icon : <DashIcon />}
              </span>

              {/* Sidebar text */}
              <p
                className={`leading-1 flex ms-4 ${
                  activeRoute(fullPath)
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.name}
              </p>
            </li>

            {/* Active highlight indicator (colored vertical bar) */}
            {activeRoute(fullPath) ? (
              <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
      );
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;
