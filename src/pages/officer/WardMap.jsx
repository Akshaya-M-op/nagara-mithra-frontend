import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Search,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import DashboardLayout from "../../layouts/DashboardLayout";
import { departmentComplaints } from "../../data/departmentComplaints";

const mapCenter = [13.0827, 80.2707];

const complaintLocations = {
  "CIV-00125": [13.0878, 80.2785],
  "CIV-00131": [13.0745, 80.2642],
  "CIV-00118": [13.0915, 80.2574],
  "CIV-00142": [13.0688, 80.2862],
  "CIV-00151": [13.0972, 80.2913],
};

function markerColor(priority) {
  if (priority === "high") return "#dc2626";
  if (priority === "medium") return "#d97706";
  return "#2563eb";
}

export default function WardMap() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const visibleComplaints = useMemo(() => {
    return departmentComplaints.filter((complaint) => {
      const text = searchText.toLowerCase();

      const matchesSearch =
        String(complaint.id || "").toLowerCase().includes(text) ||
        String(complaint.category || "")
          .toLowerCase()
          .includes(text) ||
        String(complaint.ward || "")
          .toLowerCase()
          .includes(text);

      const matchesPriority =
        priorityFilter === "all" ||
        complaint.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [searchText, priorityFilter]);

  return (
    <DashboardLayout
      role="officer"
      title="Ward Map"
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

        <p className="section-eyebrow">Geographic monitoring</p>
        <h2>Ward complaint map</h2>
        <p>
          View complaint locations and priority levels across wards.
        </p>
      </section>

      <section className="map-toolbar content-card">
        <div className="complaint-search">
          <Search size={17} />

          <input
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Search complaint or ward..."
          />
        </div>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>

        <div className="map-legend">
          <span>
            <i className="legend-dot high" />
            High
          </span>

          <span>
            <i className="legend-dot medium" />
            Medium
          </span>

          <span>
            <i className="legend-dot low" />
            Low
          </span>
        </div>
      </section>

      <section className="map-layout">
        <div className="content-card map-card">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom
            className="ward-map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {visibleComplaints.map((complaint) => {
              const position =
                complaintLocations[complaint.id] || mapCenter;

              return (
                <CircleMarker
                  key={complaint.id}
                  center={position}
                  radius={10}
                  pathOptions={{
                    color: markerColor(complaint.priority),
                    fillColor: markerColor(complaint.priority),
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>
                    <strong>{complaint.id}</strong>
                    <br />
                    {complaint.category}
                    <br />
                    {complaint.ward}
                    <br />
                    Priority: {complaint.priority}
                    <br />
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/officer/complaints/${complaint.id}`
                        )
                      }
                    >
                      Open complaint
                    </button>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        <aside className="content-card map-side-panel">
          <div className="card-heading">
            <div>
              <h3>Visible incidents</h3>
              <p>
                {visibleComplaints.length} complaints on map
              </p>
            </div>
          </div>

          <div className="map-incident-list">
            {visibleComplaints.map((complaint) => (
              <button
                type="button"
                className="map-incident-row"
                key={complaint.id}
                onClick={() =>
                  navigate(`/officer/complaints/${complaint.id}`)
                }
              >
                <span
                  className={`map-incident-icon ${complaint.priority}`}
                >
                  {complaint.priority === "high" ? (
                    <AlertTriangle size={15} />
                  ) : (
                    <ClipboardList size={15} />
                  )}
                </span>

                <span>
                  <strong>{complaint.category}</strong>
                  <small>
                    {complaint.id} · {complaint.ward}
                  </small>
                </span>

                <MapPin size={15} />
              </button>
            ))}
          </div>
        </aside>
      </section>
    </DashboardLayout>
  );
}