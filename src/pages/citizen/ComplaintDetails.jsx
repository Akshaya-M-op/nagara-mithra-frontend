import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const timeline = [
  {
    title: "Complaint submitted",
    description: "Your complaint has been registered successfully.",
    status: "done",
  },
  {
    title: "AI screening completed",
    description: "The issue category and priority are being analyzed.",
    status: "done",
  },
  {
    title: "Officer verification",
    description: "Waiting for the responsible department to verify the issue.",
    status: "current",
  },
  {
    title: "Field-worker assignment",
    description: "A field worker will be assigned after verification.",
    status: "pending",
  },
  {
    title: "Resolution and feedback",
    description: "You will receive an update after the work is completed.",
    status: "pending",
  },
];

export default function ComplaintDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const storedComplaint = localStorage.getItem(`complaint-${id}`);

  const complaint =
    location.state?.complaint ||
    (storedComplaint ? JSON.parse(storedComplaint) : null);

  return (
    <DashboardLayout
      role="citizen"
      title="Complaint Details"
      userName="Demo Citizen"
    >
      <section className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate("/citizen/complaints")}
        >
          <ArrowLeft size={17} />
          Back to complaints
        </button>

        <p className="section-eyebrow">Complaint tracking</p>
        <h2>{id}</h2>
        <p>Follow the progress of your civic issue report.</p>
      </section>

      {!complaint ? (
        <section className="content-card">
          <h3>Complaint not found</h3>
          <p className="form-info">
            We could not find this complaint in the current prototype session.
          </p>
        </section>
      ) : (
        <div className="details-grid">
          <section className="content-card">
            <div className="detail-card-header">
              <div>
                <span className="detail-label">Reported issue</span>
                <h3>{complaint.category}</h3>
              </div>

              <span className="status-pill progress">Submitted</span>
            </div>

            <div className="detail-block">
              <span className="detail-label">Description</span>
              <p>{complaint.description}</p>
            </div>

            <div className="detail-info-grid">
              <div>
                <span className="detail-label">Severity</span>
                <strong>{complaint.severity}</strong>
              </div>

              <div>
                <span className="detail-label">Address</span>
                <strong>{complaint.address}</strong>
              </div>

              <div>
                <span className="detail-label">Landmark</span>
                <strong>{complaint.landmark || "Not provided"}</strong>
              </div>

              <div>
                <span className="detail-label">Department</span>
                <strong>Awaiting AI routing</strong>
              </div>
            </div>

            {complaint.imageName ? (
              <div className="evidence-placeholder">
                <ImageIcon size={20} />
                <span>Evidence attached: {complaint.imageName}</span>
              </div>
            ) : (
              <div className="evidence-placeholder">
                <ImageIcon size={20} />
                <span>No image evidence attached</span>
              </div>
            )}

            <div className="location-placeholder">
              <MapPin size={20} />
              <div>
                <strong>Reported location</strong>
                <span>
                  {complaint.latitude && complaint.longitude
                    ? `${complaint.latitude}, ${complaint.longitude}`
                    : complaint.address}
                </span>
              </div>
            </div>
          </section>

          <section className="content-card">
            <div className="card-heading">
              <div>
                <h3>Status timeline</h3>
                <p>Live progress of your complaint.</p>
              </div>

              <Clock3 size={20} color="#98a2b3" />
            </div>

            <div className="timeline">
              {timeline.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <div
                    className={`timeline-icon ${item.status}`}
                  >
                    {item.status === "done" ? (
                      <CheckCircle2 size={17} />
                    ) : (
                      <span />
                    )}
                  </div>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}