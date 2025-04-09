import { useState, useEffect } from "react";
import svg from "../../static/texting.svg";

const NoChatSelected = () => {
  const [message, setMessage] = useState(0);
  const [bounceAnimation, setBounceAnimation] = useState(false);

  const messages = [
    "No chat selected yet...",
    "Pick a conversation to start chatting!",
    "Feeling lonely? Select a chat!",
    "The chat void awaits your choice...",
    "Select a chat to begin your adventure!",
  ];

  // Rotate through messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((prev) => (prev + 1) % messages.length);
      setBounceAnimation(true);
      setTimeout(() => setBounceAnimation(false), 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Speech Bubbles Animation
  const SpeechBubbles = () => (
    <div className="speech-bubbles position-absolute w-100 h-100">
      <div className="bubble bubble-1 position-absolute">👋</div>
      <div className="bubble bubble-2 position-absolute">💬</div>
      <div className="bubble bubble-3 position-absolute">🔍</div>
      <div className="bubble bubble-4 position-absolute">👈</div>
    </div>
  );

  return (
    <div className="no-chat-container d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
      <SpeechBubbles />

      <div className="image-container position-relative mt-4">
        <img
          src={svg}
          alt="Select a chat"
          className={`chat-image ${bounceAnimation ? "bounce" : ""}`}
          style={{ width: "300px", maxWidth: "80%" }}
        />
        <div className="pulse-ring position-absolute"></div>
      </div>

      <h2 className={`message-text mt-4 ${bounceAnimation ? "fade-in" : ""}`}>
        {messages[message]}
      </h2>

      <div className="helper-text mt-3 text-muted">
        <p>Select a conversation from the sidebar to get started</p>
      </div>

      <button
        className="btn btn-primary mt-3 pulse-button"
        onClick={() => document.querySelector(".Rooms")?.classList.add("open")}
      >
        Open Chat
      </button>

      <style jsx>{`
        .no-chat-container {
          padding: 1rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }

        .chat-image {
          transition: transform 0.3s ease;
        }

        .chat-image:hover {
          transform: scale(1.05);
        }

        .bounce {
          animation: bounce 0.5s ease;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .message-text {
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          color: #3a3a3a;
          min-height: 2.5em;
        }

        .fade-in {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .pulse-button {
          animation: pulse 2s infinite;
          box-shadow: 0 0 0 rgba(66, 133, 244, 0.4);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(66, 133, 244, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(66, 133, 244, 0);
          }
        }

        .pulse-ring {
          border-radius: 50%;
          height: 300px;
          width: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          border: 3px solid rgba(66, 133, 244, 0.4);
          animation: pulse-ring 3s infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        .bubble {
          background-color: #fff;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-size: 1.2rem;
          animation: float 4s infinite ease-in-out;
          opacity: 0.8;
        }

        .bubble-1 {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .bubble-2 {
          top: 15%;
          right: 25%;
          animation-delay: 1s;
        }

        .bubble-3 {
          bottom: 25%;
          left: 30%;
          animation-delay: 2s;
        }

        .bubble-4 {
          bottom: 30%;
          right: 20%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          75% {
            transform: translateY(10px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NoChatSelected;
