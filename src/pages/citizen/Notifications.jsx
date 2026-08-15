import { Bell, CheckCircle2, Clock3, Info } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Complaint resolved",
    message: "Your pothole complaint CIV-00118 was resolved.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "progress",
    title: "Complaint assigned",
    message:
      "Your drainage complaint CIV-00125 has been assigned to the Drainage Team.",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "info",
    title: "Complaint registered",
    message:
      "Your complaint was successfully registered and received a complaint ID.",
    time: "2 days ago",
  },
];

export default function Notifications() {
  return (
    <DashboardLayout
      role="citizen"
      title="Notifications"
      userName="Demo Citizen"
    >
      <section className="page-heading">
        <p className="section-eyebrow">Updates</p>
        <h2>Notifications</h2>
        <p>Stay updated about your complaint progress.</p>
      </section>

      <section className="notification-list">
        {notifications.map((notification) => (
          <article
            className="notification-card"
            key={notification.id}
          >
            <div className={`notification-icon ${notification.type}`}>
              {notification.type === "success" && (
                <CheckCircle2 size={19} />
              )}

              {notification.type === "progress" && (
                <Clock3 size={19} />
              )}

              {notification.type === "info" && <Info size={19} />}
            </div>

            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <span>{notification.time}</span>
            </div>

            <Bell size={17} color="#98a2b3" />
          </article>
        ))}
      </section>
    </DashboardLayout>
  );
}