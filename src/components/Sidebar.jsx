import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  Bell,
  MessageSquare,
  UserRound,
  Building2,
  ListTodo,
  UsersRound,
  Map,
  BrainCircuit,
  ClipboardCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar({ role }) {
  const citizenLinks = [
    {
      label: "Overview",
      path: "/citizen/dashboard",
      icon: <LayoutDashboard size={19} />,
    },
    {
      label: "Report a Problem",
      path: "/citizen/report",
      icon: <FilePlus2 size={19} />,
    },
    {
      label: "My Complaints",
      path: "/citizen/complaints",
      icon: <ClipboardList size={19} />,
    },
    {
      label: "Notifications",
      path: "/citizen/notifications",
      icon: <Bell size={19} />,
    },
    {
      label: "Feedback",
      path: "/citizen/feedback",
      icon: <MessageSquare size={19} />,
    },
    {
      label: "Profile",
      path: "/citizen/profile",
      icon: <UserRound size={19} />,
    },
  ];

  const officerLinks = [
    {
      label: "Overview",
      path: "/officer/dashboard",
      icon: <LayoutDashboard size={19} />,
    },
    {
      label: "Departments",
      path: "/officer/departments",
      icon: <Building2 size={19} />,
    },
    {
      label: "Priority Queue",
      path: "/officer/priority-queue",
      icon: <ListTodo size={19} />,
    },
    {
      label: "Ward Map",
      path: "/officer/ward-map",
      icon: <Map size={19} />,
    },
    {
      label: "Field Workers",
      path: "/officer/workers",
      icon: <UsersRound size={19} />,
    },
    {
      label: "Predictive Maintenance",
      path: "/officer/predictive-maintenance",
      icon: <BrainCircuit size={19} />,
    },
    {
      label: "Reports",
      path: "/officer/reports",
      icon: <ClipboardCheck size={19} />,
    },
    {
  label: "Profile",
  path: "/officer/profile",
  icon: <UserRound size={19} />,
},
  ];

  const fieldWorkerLinks = [
  {
    label: "Overview",
    path: "/fieldworker/dashboard",
    icon: <LayoutDashboard size={19} />,
  },
  {
    label: "My Tasks",
    path: "/fieldworker/tasks",
    icon: <ClipboardList size={19} />,
  },
  {
    label: "Map",
    path: "/fieldworker/map",
    icon: <Map size={19} />,
  },
  {
    label: "Completed",
    path: "/fieldworker/completed",
    icon: <ClipboardCheck size={19} />,
  },
  {
    label: "Profile",
    path: "/fieldworker/profile",
    icon: <UserRound size={19} />,
  },
];

  const links =
    role === "citizen"
      ? citizenLinks
      : role === "officer"
        ? officerLinks
        : fieldWorkerLinks;

  function handleLogout() {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-symbol small">N</div>
        <div>
          <strong>NagaraMithra</strong>
          <span>AI Civic Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={19} />
        <span>Logout</span>
      </button>
    </aside>
  );
}