import { useState } from "react";
import { MapPin, Upload, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const categories = [
  "Pothole or damaged road",
  "Drainage blockage",
  "Sanitation or garbage issue",
  "Flooding or waterlogging",
  "Streetlight problem",
  "Water leakage",
  "Other civic issue",
];

export default function ReportProblem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    description: "",
    severity: "medium",
    address: "",
    landmark: "",
    latitude: "",
    longitude: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage("");
  }

  function handleLocation() {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by this browser.");
      return;
    }

    setMessage("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((previous) => ({
          ...previous,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));

        setMessage("Location captured successfully.");
      },
      () => {
        setMessage(
          "Location permission was denied. You can enter the address manually."
        );
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.category) {
      setMessage("Please select a problem category.");
      return;
    }

    if (form.description.trim().length < 10) {
      setMessage("Please provide a description of at least 10 characters.");
      return;
    }

    if (!form.address.trim()) {
      setMessage("Please enter the problem address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    setTimeout(() => {
      const complaintId = `CIV-${Math.floor(10000 + Math.random() * 90000)}`;

      const complaint = {
        complaintId,
        ...form,
        imageName: file?.name || null,
        status: "submitted",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
  `complaint-${complaintId}`,
  JSON.stringify(complaint)
);

const existingComplaints = JSON.parse(
  localStorage.getItem("nagarMithraComplaints") || "[]"
);

localStorage.setItem(
  "nagarMithraComplaints",
  JSON.stringify([complaint, ...existingComplaints])
);

      setIsSubmitting(false);

      navigate(`/citizen/complaints/${complaintId}`, {
        state: {
          complaint,
          newlySubmitted: true,
        },
      });
    }, 900);
  }

  return (
    <DashboardLayout
      role="citizen"
      title="Report a Problem"
      userName="Demo Citizen"
    >
      <section className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate("/citizen/dashboard")}
        >
          <ArrowLeft size={17} />
          Back to overview
        </button>

        <p className="section-eyebrow">Citizen services</p>
        <h2>Report a civic issue</h2>
        <p>
          Share clear information so the responsible department can respond
          quickly.
        </p>
      </section>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-section-heading">
            <span className="form-step">01</span>
            <div>
              <h3>Problem information</h3>
              <p>Tell us what is happening.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field full-width">
              <label htmlFor="category">
                Problem category <span>*</span>
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">
                Describe the problem <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Example: Water is accumulating near the school because the drain appears blocked."
                rows="5"
              />

              <small>
                Include what happened, where it happened, and how long it has
                been happening.
              </small>
            </div>

            <div className="form-field">
              <label htmlFor="severity">Severity</label>

              <select
                id="severity"
                name="severity"
                value={form.severity}
                onChange={handleChange}
              >
                <option value="low">Low - Minor inconvenience</option>
                <option value="medium">Medium - Needs attention</option>
                <option value="high">High - Safety or health risk</option>
                <option value="emergency">Emergency - Immediate danger</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <span className="form-step">02</span>
            <div>
              <h3>Photo evidence</h3>
              <p>Add a clear image of the problem, if available.</p>
            </div>
          </div>

          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {preview ? (
              <img
                src={preview}
                alt="Selected complaint"
                className="image-preview"
              />
            ) : (
              <>
                <Upload size={27} />
                <strong>Click to upload an image</strong>
                <span>PNG, JPG or WEBP up to 5 MB</span>
              </>
            )}
          </label>

          {file && <p className="selected-file">{file.name}</p>}
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <span className="form-step">03</span>
            <div>
              <h3>Problem location</h3>
              <p>Provide the location so the field team can find it.</p>
            </div>
          </div>

          <button
            type="button"
            className="location-button"
            onClick={handleLocation}
          >
            <MapPin size={18} />
            Use my current location
          </button>

          <div className="location-coordinates">
            <div>
              <span>Latitude</span>
              <strong>{form.latitude || "Not captured"}</strong>
            </div>

            <div>
              <span>Longitude</span>
              <strong>{form.longitude || "Not captured"}</strong>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="address">
                Address or area <span>*</span>
              </label>

              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Example: Ward 12, Main Road"
              />
            </div>

            <div className="form-field">
              <label htmlFor="landmark">Nearby landmark</label>

              <input
                id="landmark"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Example: Near Government School"
              />
            </div>
          </div>
        </section>

        {message && <p className="form-message">{message}</p>}

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/citizen/dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-action"
            disabled={isSubmitting}
          >
            <Send size={17} />
            {isSubmitting ? "Registering..." : "Submit Complaint"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}