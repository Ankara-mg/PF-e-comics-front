import "./WhisperBubble.css";

const WhisperBubble = ({ children, className = "" }) => {
  return (
    <div className={`container position-relative ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" preserveAspectRatio="none">
        <path
          className="whisper-bubble"
          d="M372.8,14.3c-196.9,0-356.2,84.9-356.2,176.6c0,71.8,98.7,132.9,236,156C260.8,405.6,269,439,312,471c-22-49-30-78-13-118 c6.6,0,66.6,3.3,73.8,3.3c196.9,0,356.2-74.2,356.2-165.9S569.7,14.3,372.8,14.3z"
        />
      </svg>

      <div className="whisper-bubble-content">
        {children}
      </div>
    </div>
  );
};

export default WhisperBubble;