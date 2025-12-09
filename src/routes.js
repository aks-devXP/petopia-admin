import React from "react";

// Admin Imports
import MainDashboard from "views/admin/users";
import Veterinaries from "views/admin/providers";
import Profile from "views/admin/profile";
import SettingPage from "views/admin/settingPage";
import BreedInfoEditor from "views/admin/settingPage/components/BreedInfoEditor";
import UserProfile from "views/admin/users/UserProfile";
import ProviderProfile from "views/admin/providers/ProviderProfile";

// Provider Imports
import ProviderDashboard from "views/provider/dashboard";
import Schedule from "views/provider/schedule";
import History from "views/provider/schedule/components/History";
import ServiceProfile from "views/provider/profile";
import EditorPage from "views/provider/profile/EditorPage";
import NgoDashboard from "views/ngo/dashboard";
import NgoProfile from "views/ngo/profile";
import NgoManageQuery from "views/ngo/manage-query";
import NgoEditor from "views/ngo/profile/EditorPage";
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icons
import {
  MdOutlinePets,
  MdPerson,
  MdSettings,
  MdOutlineSchedule,
  MdWorkspaces,
  MdManageAccounts,
  MdSpaceDashboard,
  MdQuestionAnswer,
} from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

const routes = [
  // ----------------- ADMIN ROUTES -----------------
  {
    name: "Users",
    layout: "/admin",
    path: "user-dashboard",
    icon: <MdManageAccounts className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "User Profile",
    layout: "/admin",
    path: "user-dashboard/:userId",
    icon: <MdPerson className="h-6 w-6" />,
    component: <UserProfile />,
    showInSidebar: false,
  },
  {
    name: "Providers",
    layout: "/admin",
    path: "provider-dashboard",
    icon: <MdWorkspaces className="h-6 w-6" />,
    component: <Veterinaries />,
    secondary: true,
  },
  {
    name: "Provider Profile",
    layout: "/admin",
    path: "provider-dashboard/:Id",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProviderProfile />,
    showInSidebar: false,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "manage-pet",
    icon: <MdPerson className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Manage Breeds",
    layout: "/admin",
    path: "manage-breeds",
    icon: <MdOutlinePets className="h-6 w-6" />,
    component: <SettingPage />,
  },
  {
    name: "Breed Editor",
    layout: "/admin",
    path: "breed-info/:slug",
    icon: <MdSettings className="h-6 w-6" />,
    component: <BreedInfoEditor />,
    showInSidebar: false,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profile />,
  },

  // ----------------- PROVIDER ROUTES -----------------
  {
    name: "Dashboard",
    layout: "/provider",
    path: "dashboard",
    icon: <MdSpaceDashboard className="h-6 w-6" />,
    component: <ProviderDashboard />,
    showInSidebar: true,
    showInNavbar: true,
  },
  {
    name: "Schedule",
    layout: "/provider",
    path: "schedule",
    icon: <FaCalendarCheck className="h-5 w-5" />,
    component: <Schedule />,
    showInSidebar: true,
    showInNavbar: true,
    children: [
      {
        path: "history",
        component: <History />,
      },
    ],
  },
  {
    name: "Profile",
    layout: "/provider",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ServiceProfile />,
    showInSidebar: true,
    showInNavbar: true,
  },
  {
    name: "Edit Profile",
    layout: "/provider",
    path: "profile/edit",
    icon: <MdPerson className="h-6 w-6" />,
    component: <EditorPage />,
    showInSidebar: false,
    showInNavbar: false,
  },
  // ----------------- NGO ROUTES -----------------
  {
    name: "Dashboard",
    layout: "/ngo",
    path: "dashboard",
    icon: <MdSpaceDashboard className="h-6 w-6" />,
    component: <NgoDashboard />,
    showInSidebar: true,
    showInNavbar: true,
  },
  {
    name: "Profile",
    layout: "/ngo",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NgoProfile />,
    showInSidebar: true,
    showInNavbar: true,
  },
  {
    name: "Edit Profile",
    layout: "/ngo",
    path: "editor",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NgoEditor />,
    showInSidebar: false,
    showInNavbar: false,
  },
  {
    name: "Manage Query",
    layout: "/ngo",
    path: "manage-query",
    icon: <MdQuestionAnswer className="h-6 w-6" />,
    component: <NgoManageQuery />,
    showInSidebar: true,
    showInNavbar: true,
  },
];

export default routes;
