import { useState } from "react";
import { MessageCircle, X, ChevronRight, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const helpOptions = [
  {
    question: "How do I register a complaint?",
    answer:
      "Click Report a Problem, select the category, describe the issue, add a photo and location, then select Submit Complaint.",
    path: "/citizen/report",
    button: "Go to Report a Problem",
  },
  {
    question: "How do I track my complaint?",
    answer:
      "Open My Complaints from the sidebar and select View Details on the complaint you want to track.",
    path: "/citizen/complaints",
    button: "Go to My Complaints",
  },
  {
    question: "What does In Progress mean?",
    answer:
      "In Progress means the responsible field team has started working on your complaint.",
    path: null,
    button: null,
  },
  {
    question: "How do I give feedback?",
    answer:
      "Open Feedback from the sidebar after your complaint has been resolved.",
    path: "/citizen/feedback",
    button: "Go to Feedback",
  },
  {
    question: "How do I reopen a complaint?",
    answer:
      "Open the resolved complaint, select the issue-not-resolved option, and submit your feedback.",
    path: "/citizen/complaints",
    button: "View My Complaints",
  },
];

function findAnswer(input) {
  const text = input.toLowerCase();

  if (
    text.includes("register") ||
    text.includes("submit") ||
    text.includes("complaint")
  ) {
    return {
      answer:
        "To register a complaint, open Report a Problem, select the category, describe the issue, upload a photo, add the location, review the details, and click Submit Complaint.",
      path: "/citizen/report",
      button: "Go to Report a Problem",
    };
  }

  if (text.includes("track") || text.includes("status")) {
    return {
      answer:
        "Open My Complaints and select View Details to see the complaint status timeline.",
      path: "/citizen/complaints",
      button: "Go to My Complaints",
    };
  }

  if (
    text.includes("feedback") ||
    text.includes("rating") ||
    text.includes("review")
  ) {
    return {
      answer:
        "Open Feedback from the sidebar to provide a rating and comment after your complaint is resolved.",
      path: "/citizen/feedback",
      button: "Go to Feedback",
    };
  }

  if (text.includes("reopen") || text.includes("not fixed")) {
    return {
      answer:
        "Open My Complaints, select the complaint, and use the feedback option to report that the problem is still unresolved.",
      path: "/citizen/complaints",
      button: "View My Complaints",
    };
  }

  return {
    answer:
      "I can guide you through complaint registration, tracking, feedback, and reopening an unresolved complaint. Please select one of the suggested options.",
    path: null,
    button: null,
  };
}

export default function HelpChatbot() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHelp, setSelectedHelp] = useState(null);
  const [userMessage, setUserMessage] = useState("");

  function closeChatbot() {
    setIsOpen(false);
    setSelectedHelp(null);
    setUserMessage("");
  }

  function handleUserSubmit(event) {
    event.preventDefault();

    if (!userMessage.trim()) return;

    setSelectedHelp(findAnswer(userMessage));
    setUserMessage("");
  }

  return (
    <>
      {!isOpen && (
        <button
          className="help-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open help assistant"
        >
          <MessageCircle size={17} />
          Need Help?
        </button>
      )}

      {isOpen && (
        <section
          className="help-chat-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
        >
          <header className="help-chat-header">
            <div>
              <span className="help-status-dot" />

              <div>
                <h3 id="help-title">NagaraMithra Help</h3>
                <p>Portal guidance assistant</p>
              </div>
            </div>

            <button
              className="help-close"
              onClick={closeChatbot}
              aria-label="Close help assistant"
            >
              <X size={18} />
            </button>
          </header>

          <div className="help-chat-body">
            {selectedHelp ? (
              <>
                <button
                  className="help-back"
                  onClick={() => setSelectedHelp(null)}
                >
                  ← Back to help options
                </button>

                <div className="help-answer">
                  <p>{selectedHelp.answer}</p>
                </div>

                {selectedHelp.path && (
                  <button
                    className="help-navigation"
                    onClick={() => {
                      navigate(selectedHelp.path);
                      closeChatbot();
                    }}
                  >
                    {selectedHelp.button}
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="help-intro">
                  <p>
                    Hello! I can guide you through the NagaraMithra website.
                  </p>
                </div>

                <p className="help-question-label">
                  Choose a common question
                </p>

                <div className="help-options">
                  {helpOptions.map((option) => (
                    <button
                      key={option.question}
                      className="help-option"
                      onClick={() => setSelectedHelp(option)}
                    >
                      <span>{option.question}</span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </>
            )}

            <form
              className="help-input-form"
              onSubmit={handleUserSubmit}
            >
              <input
                value={userMessage}
                onChange={(event) => setUserMessage(event.target.value)}
                placeholder="Type your question..."
                aria-label="Type a help question"
              />

              <button type="submit" aria-label="Send question">
                <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}