import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import { NgoProfileProvider } from "context/NgoProfileContext";

export default function NgoLayout(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("NGO Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "NGO Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + "/" + routes[i].path) !==
        -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.flatMap((prop, key) => {
      if (prop.layout === "/ngo") {
        let elements = [
          <Route
            key={prop.layout + prop.path}
            path={`/${prop.path}`}
            element={prop.component}
          />
        ];
        if (prop.children) {
          prop.children.forEach((child, idx) => {
            elements.push(
              <Route
                key={`${prop.layout}${prop.path}-${child.path}-${idx}`}
                path={`/${prop.path}/${child.path}`}
                element={child.component}
              />
            );
          });
        }
        return elements;
      }
      return [];
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <NgoProfileProvider>
      <div className="flex h-full w-full">
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          routes={routes.filter((r) => r.layout === "/ngo")}
        />

        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"React"}
                brandText={currentRoute}
                secondary={getActiveNavbar(routes.filter((r) => r.layout === "/ngo"))}
                {...rest}
              />
              <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/ngo/dashboard" replace />}
                  />
                </Routes>
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </NgoProfileProvider>
  );
}
