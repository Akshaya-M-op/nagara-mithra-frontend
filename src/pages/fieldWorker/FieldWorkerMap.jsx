import {
  ArrowLeft,
  ClipboardList,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fieldWorkerTasks } from "../../data/fieldWorkerTasks";

const mapCenter = [13.0827, 80.2707];

const taskLocations = {
  "TASK-001": [13.0878, 80.2785],
  "TASK-002": [13.0745, 80.2642],
};

export default function FieldWorkerMap() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      role="fieldworker"
      title="Task Map"
      userName="Arun Kumar"
    >
      <section className="page-heading">
        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/fieldworker/dashboard")
          }
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </button>

        <p className="section-eyebrow">Field navigation</p>
        <h2>Assigned task map</h2>
        <p>
          View the locations of your assigned civic tasks.
        </p>
      </section>

      <section className="worker-map-layout">
        <div className="content-card worker-map-card">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom
            className="worker-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {fieldWorkerTasks.map((task) => {
              const position =
                taskLocations[task.id] || mapCenter;

              return (
                <CircleMarker
                  key={task.id}
                  center={position}
                  radius={10}
                  pathOptions={{
                    color:
                      task.priority === "high"
                        ? "#dc2626"
                        : "#2563eb",
                    fillColor:
                      task.priority === "high"
                        ? "#dc2626"
                        : "#2563eb",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>
                    <strong>{task.title}</strong>
                    <br />
                    {task.ward}, {task.location}
                    <br />
                    Status: {task.status}
                    <br />
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/fieldworker/tasks/${task.id}`
                        )
                      }
                    >
                      Open task
                    </button>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        <aside className="content-card worker-map-task-panel">
          <div className="card-heading">
            <div>
              <h3>Task locations</h3>
              <p>
                {fieldWorkerTasks.length} assigned locations
              </p>
            </div>
          </div>

          <div className="worker-map-task-list">
            {fieldWorkerTasks.map((task) => (
              <button
                type="button"
                className="worker-map-task-row"
                key={task.id}
                onClick={() =>
                  navigate(`/fieldworker/tasks/${task.id}`)
                }
              >
                <span className="worker-map-task-icon">
                  <MapPin size={16} />
                </span>

                <span>
                  <strong>{task.title}</strong>
                  <small>
                    {task.ward} · {task.location}
                  </small>
                </span>

                <ClipboardList size={15} />
              </button>
            ))}
          </div>
        </aside>
      </section>
    </DashboardLayout>
  );
}