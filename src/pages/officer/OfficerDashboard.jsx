import {
  ClipboardList,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departments } from "../../data/departments";

export default function OfficerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      role="officer"
      title="Officer Overview"
      userName="Demo Officer"
    >
      <section className="page-heading officer-heading">
        <div>
          <p className="section-eyebrow">Administrative control center</p>
          <h2>Good afternoon, Officer</h2>
          <p>
            Monitor civic complaints, department performance and resolution
            progress.
          </p>
        </div>

        <div className="live-indicator">
          <span />
          System operational
        </div>
      </section>

      <section className="stats-grid officer-stats">
        <div className="dashboard-stat blue">
          <div className="stat-icon">
            <ClipboardList size={20} />
          </div>
          <span>Total complaints</span>
          <strong>1,248</strong>
          <small>Across all departments</small>
        </div>

        <div className="dashboard-stat orange">
          <div className="stat-icon">
            <Clock3 size={20} />
          </div>
          <span>Pending verification</span>
          <strong>124</strong>
          <small>Require officer review</small>
        </div>

        <div className="dashboard-stat red">
          <div className="stat-icon">
            <AlertTriangle size={20} />
          </div>
          <span>High priority</span>
          <strong>86</strong>
          <small>Safety or health risks</small>
        </div>

        <div className="dashboard-stat green">
          <div className="stat-icon">
            <CheckCircle2 size={20} />
          </div>
          <span>Resolved this month</span>
          <strong>791</strong>
          <small>Approved resolutions</small>
        </div>

        <button
    type="button"
    className="dashboard-stat blue officer-clickable-card"
    onClick={() => navigate("/officer/workers")}
  >
    <div className="stat-icon">
      <ClipboardList size={20} />
    </div>

    <span>Field workers</span>
    <strong>86</strong>
    <small>Monitor all field workers</small>
  </button>
        
      </section>

      <section className="officer-section-header">
        <div>
          <p className="section-eyebrow">Department workspaces</p>
          <h2>Select a department</h2>
          <p>
            Department access requires the standard credentials allocated to
            that department.
          </p>
        </div>
      </section>

      <section className="department-grid">
        {departments.map((department) => {
          const Icon = department.icon;

          return (
            <article
              className={`department-card ${department.color}`}
              key={department.id}
            >
              <div className="department-card-top">
                <div className="department-icon">
                  <Icon size={23} />
                </div>

                <span className="department-code">
                  {department.code}
                </span>
              </div>

              <h3>{department.name}</h3>
              <p>{department.description}</p>

              <div className="department-metrics">
                <div>
                  <strong>{department.complaints}</strong>
                  <span>Total cases</span>
                </div>

                <div>
                  <strong>{department.highPriority}</strong>
                  <span>High priority</span>
                </div>
              </div>

              <button
                className="department-access-button"
                onClick={() => navigate(`/officer/departments/${department.id}`)}
              >
                Enter department
                <ArrowRight size={16} />
              </button>
            </article>
          );
        })}
      </section>

      <section className="content-card priority-preview">
        <div className="card-heading">
          <div>
            <h3>Priority queue</h3>
            <p>Complaints that require immediate attention.</p>
          </div>

          <button
            className="view-link-button"
            onClick={() => navigate("/officer/priority-queue")}
          >
            View full queue
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="priority-row">
          <div className="priority-number high">HIGH</div>
          <div>
            <strong>CIV-00125 · Drainage blockage</strong>
            <span>Ward 12, near Government School</span>
          </div>
          <span className="priority-reason">
            Repeated complaints
          </span>
        </div>

        <div className="priority-row">
          <div className="priority-number high">HIGH</div>
          <div>
            <strong>CIV-00131 · Dangerous pothole</strong>
            <span>Ward 8, Main Bus Road</span>
          </div>
          <span className="priority-reason">Safety risk</span>
        </div>

        <div className="priority-row">
          <div className="priority-number medium">MED</div>
          <div>
            <strong>CIV-00118 · Garbage accumulation</strong>
            <span>Ward 5, Market Street</span>
          </div>
          <span className="priority-reason">Pending 2 days</span>
        </div>
      </section>
      <section className="officer-feature-grid">
  <button
    type="button"
    className="feature-navigation-card"
    onClick={() => navigate("/officer/ward-map")}
  >
    <MapPin size={22} />
    <span>Ward map</span>
    <small>View complaints by location</small>
  </button>

  <button
  type="button"
  className="feature-navigation-card"
  onClick={() =>
    navigate("/officer/work-validation")
  }
>
  <CheckCircle2 size={22} />
  <span>Work validation</span>
  <small>Review field-worker completion evidence</small>
</button>
</section>
<button
  type="button"
  className="feature-navigation-card"
  onClick={() =>
    navigate("/officer/predictive-maintenance")
  }
>
  <TrendingUp size={22} />
  <span>Predictive maintenance</span>
  <small>Identify recurring civic asset risks</small>
</button>

<button
  type="button"
  className="feature-navigation-card"
  onClick={() => navigate("/officer/reports")}
>
  <BarChart3 size={22} />
  <span>Reports and analytics</span>
  <small>View department performance reports</small>
</button>
    </DashboardLayout>
  );
}