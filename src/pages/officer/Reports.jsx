import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";

const monthlyData = [
  { month: "Jan", received: 180, resolved: 132 },
  { month: "Feb", received: 210, resolved: 168 },
  { month: "Mar", received: 240, resolved: 196 },
  { month: "Apr", received: 198, resolved: 176 },
  { month: "May", received: 260, resolved: 222 },
  { month: "Jun", received: 230, resolved: 214 },
];

const departmentData = [
  { name: "Drainage", complaints: 320 },
  { name: "Roads", complaints: 286 },
  { name: "Sanitation", complaints: 244 },
  { name: "Streetlights", complaints: 198 },
];

const statusData = [
  { name: "Resolved", value: 791, color: "#16a34a" },
  { name: "In progress", value: 214, color: "#d97706" },
  { name: "Pending", value: 124, color: "#2563eb" },
  { name: "Rejected", value: 46, color: "#dc2626" },
];

export default function Reports() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      role="officer"
      title="Reports and Analytics"
      userName="Demo Officer"
    >
      <section className="page-heading report-heading">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/officer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to officer overview
          </button>

          <p className="section-eyebrow">Performance intelligence</p>
          <h2>Reports and analytics</h2>
          <p>
            Understand complaint volume, department workload and
            resolution performance.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            window.alert("Report export will be connected later.")
          }
        >
          <Download size={16} />
          Export report
        </button>
      </section>

      <section className="report-summary-grid">
        <div className="report-summary-card">
          <BarChart3 size={20} />
          <span>Total complaints</span>
          <strong>1,248</strong>
          <small>Across all departments</small>
        </div>

        <div className="report-summary-card positive">
          <CheckCircle2 size={20} />
          <span>Resolution rate</span>
          <strong>63%</strong>
          <small>Improved from last month</small>
        </div>

        <div className="report-summary-card warning">
          <Clock3 size={20} />
          <span>Average resolution</span>
          <strong>3.8 days</strong>
          <small>Current average</small>
        </div>

        <div className="report-summary-card blue">
          <TrendingUp size={20} />
          <span>Citizen satisfaction</span>
          <strong>84%</strong>
          <small>Based on feedback</small>
        </div>
      </section>

      <section className="report-chart-grid">
        <div className="content-card report-chart-card">
          <div className="card-heading">
            <div>
              <h3>Monthly complaint movement</h3>
              <p>Received versus resolved complaints.</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="received"
                  name="Received"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="resolved"
                  name="Resolved"
                  fill="#16a34a"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="content-card report-chart-card">
          <div className="card-heading">
            <div>
              <h3>Complaint status</h3>
              <p>Current distribution of cases.</p>
            </div>
          </div>

          <div className="chart-container pie-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={94}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h3>Department workload</h3>
            <p>Complaint distribution across departments.</p>
          </div>
        </div>

        <div className="department-report-list">
          {departmentData.map((department) => (
            <div
              className="department-report-row"
              key={department.name}
            >
              <span>{department.name}</span>

              <div className="department-report-bar">
                <span
                  style={{
                    width: `${(department.complaints / 320) * 100}%`,
                  }}
                />
              </div>

              <strong>{department.complaints}</strong>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}