import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!satisfaction) {
      return;
    }

    const feedback = {
      rating,
      satisfaction,
      comment,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "nagaraMithraFeedback",
      JSON.stringify(feedback)
    );

    setSubmitted(true);
  }

  return (
    <DashboardLayout
      role="citizen"
      title="Feedback"
      userName="Demo Citizen"
    >
      <section className="page-heading">
        <p className="section-eyebrow">Citizen voice</p>
        <h2>Give feedback</h2>
        <p>Help us understand whether your issue was resolved properly.</p>
      </section>

      {submitted ? (
        <section className="success-state">
          <div className="success-state-icon">
            <CheckCircle2 size={32} />
          </div>
          <h3>Thank you for your feedback</h3>
          <p>Your response has been recorded successfully.</p>
        </section>
      ) : (
        <form className="content-card feedback-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Which complaint are you reviewing?</label>
            <select required>
              <option value="">Select a resolved complaint</option>
              <option value="CIV-00118">
                CIV-00118 - Pothole
              </option>
              <option value="CIV-00120">
                CIV-00120 - Sanitation
              </option>
            </select>
          </div>

          <div className="feedback-question">
            <label>Was the problem resolved?</label>

            <div className="satisfaction-options">
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="satisfied"
                  checked={satisfaction === "satisfied"}
                  onChange={(event) =>
                    setSatisfaction(event.target.value)
                  }
                  required
                />
                Yes, the issue was resolved
              </label>

              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="not_satisfied"
                  checked={satisfaction === "not_satisfied"}
                  onChange={(event) =>
                    setSatisfaction(event.target.value)
                  }
                />
                No, the issue still exists
              </label>
            </div>
          </div>

          <div className="feedback-question">
            <label>Rate the resolution</label>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} out of 5`}
                >
                  <Star
                    size={26}
                    fill={star <= rating ? "#F79009" : "none"}
                    color={star <= rating ? "#F79009" : "#D0D5DD"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="comment">Additional comments</label>
            <textarea
              id="comment"
              rows="5"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Tell us about your experience."
            />
          </div>

          <div className="form-actions">
            <button className="primary-action" type="submit">
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
}