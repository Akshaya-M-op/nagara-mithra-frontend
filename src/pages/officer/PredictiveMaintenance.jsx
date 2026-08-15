import { useMemo, useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const maintenanceItems = [
  {
    id: "AST-001",
    asset: "Ward 12 drainage line",
    department: "Drainage",
    ward: "Ward 12",
    issue: "Repeated blockage pattern",
    risk: "high",
    probability: 86,
    lastRepair: "18 days ago",
    recommendedAction: "Schedule preventive cleaning",
  },
  {
    id: "AST-002",
    asset: "Main Bus Road surface",
    department: "Roads",
    ward: "Ward 8",
    issue: "Pothole recurrence",
    risk: "high",
    probability: 78,
    lastRepair: "31 days ago",
    recommendedAction: "Inspect road section",
  },
  {
    id: "AST-003",
    asset: "Market Street waste point",
    department: "Sanitation",
    ward: "Ward 5",
    issue: "Collection overflow pattern",
    risk: "medium",
    probability: 64,
    lastRepair: "12 days ago",
    recommendedAction: "Review collection schedule",
  },
  {
    id: "AST-004",
    asset: "North Ward streetlight cluster",
    department: "Streetlights",
    ward: "Ward 3",
    issue: "Repeated outage reports",
    risk: "medium",
    probability: 57,
    lastRepair: "24 days ago",
    recommendedAction: "Inspect electrical connection",
  },
];

const riskLabels = {
  high: "High risk",
  medium: "Medium risk",
  low: "Low risk",
};

export default function PredictiveMaintenance() {
  const navigate = useNavigate();

  const [riskFilter, setRiskFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredItems = useMemo(() => {
    return maintenanceItems.filter((item) => {
      const text = searchText.toLowerCase();

      const matchesSearch =
        item.asset.toLowerCase().includes(text) ||
        item.department.toLowerCase().includes(text) ||
        item.ward.toLowerCase().includes(text) ||
        item.issue.toLowerCase().includes(text);

      const matchesRisk =
        riskFilter === "all" || item.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [riskFilter, searchText]);

  const highRiskCount = maintenanceItems.filter(
    (item) => item.risk === "high"
  ).length;

  const mediumRiskCount = maintenanceItems.filter(
    (item) => item.risk === "medium"
  ).length;

  return (
    <DashboardLayout
      role="officer"
      title="Predictive Maintenance"
      userName="Demo Officer"
    >
      <section className="page-heading">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/officer/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to officer overview
        </button>

        <p className="section-eyebrow">Early-warning operations</p>
        <h2>Predictive maintenance</h2>
        <p>
          Identify civic assets that may require preventive action.
        </p>
      </section>

      <section className="maintenance-summary-grid">
        <div className="maintenance-summary-card high">
          <AlertTriangle size={20} />
          <span>High-risk assets</span>
          <strong>{highRiskCount}</strong>
          <small>Require immediate review</small>
        </div>

        <div className="maintenance-summary-card medium">
          <Clock3 size={20} />
          <span>Medium-risk assets</span>
          <strong>{mediumRiskCount}</strong>
          <small>Monitor and schedule</small>
        </div>

        <div className="maintenance-summary-card total">
          <Wrench size={20} />
          <span>Assets monitored</span>
          <strong>{maintenanceItems.length}</strong>
          <small>Across departments</small>
        </div>

        <div className="maintenance-summary-card positive">
          <CheckCircle2 size={20} />
          <span>Preventive actions</span>
          <strong>12</strong>
          <small>Completed this month</small>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Maintenance risk signals</h3>
            <p>
              {filteredItems.length} asset
              {filteredItems.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="maintenance-controls">
            <div className="complaint-search">
              <Search size={17} />

              <input
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search asset, department or ward..."
              />
            </div>

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(event.target.value)
              }
            >
              <option value="all">All risk levels</option>
              <option value="high">High risk</option>
              <option value="medium">Medium risk</option>
              <option value="low">Low risk</option>
            </select>
          </div>
        </div>

        <div className="maintenance-list">
          {filteredItems.map((item) => (
            <article
              className={`maintenance-row ${item.risk}`}
              key={item.id}
            >
              <div className="maintenance-risk-icon">
                {item.risk === "high" ? (
                  <AlertTriangle size={18} />
                ) : (
                  <TrendingUp size={18} />
                )}
              </div>

              <div className="maintenance-main">
                <div className="maintenance-title-row">
                  <h4>{item.asset}</h4>
                  <span className={`risk-badge ${item.risk}`}>
                    {riskLabels[item.risk]}
                  </span>
                </div>

                <p>{item.issue}</p>

                <div className="maintenance-meta">
                  <span>{item.department}</span>
                  <span>{item.ward}</span>
                  <span>Last repair: {item.lastRepair}</span>
                </div>
              </div>

              <div className="maintenance-probability">
                <span>Failure likelihood</span>
                <strong>{item.probability}%</strong>

                <div className="probability-bar">
                  <span
                    style={{ width: `${item.probability}%` }}
                  />
                </div>
              </div>

              <div className="maintenance-action">
                <span>Recommended action</span>
                <strong>{item.recommendedAction}</strong>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  window.alert(
                    `${item.asset}: ${item.recommendedAction}`
                  )
                }
              >
                Review
              </button>
            </article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}