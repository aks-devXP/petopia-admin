import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { FiArrowRight } from "react-icons/fi";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation(); // Gives current URL path

  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Handle resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1200) setOpen(false);
      else setOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update current route on URL change
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
  };

  const getActiveNavbar = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return false;
  };

  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
      }
      return null;
    });

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Floating Arrow Button (for small screens) */}
      {windowWidth < 1200 && !open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed top-1 left-0 z-50 flex items-center justify-center rounded-r-full bg-navy-700 p-1.5 shadow-lg transition-all hover:bg-navy-800 dark:bg-white dark:text-navy-900 cursor-pointer"
        >
          <FiArrowRight className="text-white dark:text-navy-900 text-md" />
        </div>
      )}

      {/* Navbar + Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"eact"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />

            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Navigate to="/admin/user-dashboard" replace />} />
              </Routes>
            </div>

            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
