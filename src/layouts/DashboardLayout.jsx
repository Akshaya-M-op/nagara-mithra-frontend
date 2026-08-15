import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const defaultNames = {
  citizen: "Demo Citizen",
  officer: "Demo Officer",
  fieldworker: "Arun Kumar",
};

export default function DashboardLayout({
  role,
  title,
  userName,
  children,
}) {
  const savedUserId = localStorage.getItem("userId");

  const savedProfileKey =
    role === "fieldworker"
      ? "fieldWorkerProfile"
      : role === "citizen"
        ? "citizenProfile"
        : "nagaraMithraProfile";

  const savedProfile = localStorage.getItem(savedProfileKey);

  let profileName =
    userName || defaultNames[role] || "User";

  if (savedUserId) {
    if (role === "fieldworker") {
      profileName = "Arun Kumar";
    } else if (role === "officer") {
      profileName = "Demo Officer";
    } else if (role === "citizen") {
      profileName = "Demo Citizen";
    }
  }

  if (savedProfile) {
    try {
      const profile = JSON.parse(savedProfile);

      if (profile.name && !savedUserId) {
        profileName = profile.name;
      }
    } catch {
      profileName =
        userName || defaultNames[role] || "User";
    }
  }

  return (
    <div className="dashboard-shell">
      <Sidebar role={role} />

      <div className="dashboard-main">
        <Topbar
          title={title}
          userName={profileName}
        />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}