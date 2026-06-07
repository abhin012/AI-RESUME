function MatchResultPage({ matchResult, onBack }) {
  const { matchScore, missingSkills, suggestions } = matchResult;

  const scoreColor = matchScore >= 70 ? "#4CAF7C" : matchScore >= 40 ? "#fbbf24" : "#E05555";

  const styles = `
    .result-btn:hover { transform: scale(1.03); }
    .result-btn:active { transform: scale(0.97); }

    .match-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 32px;
    }

    @media (max-width: 600px) {
      .match-grid { grid-template-columns: 1fr; }
    }
  `;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0A0A0A",
      padding: "48px 20px"
    }}>
      <style>{styles}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            onClick={onBack}
            style={{
              fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "300",
              letterSpacing: "0.4em", color: "#C9A84C", marginBottom: "8px",
              cursor: "pointer"
            }}
          >
            RESUME AI
          </h1>
          <p style={{
            fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#6A6660", marginBottom: "24px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif"
          }}>
            Job Match Report
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)"
          }} />
        </div>

        {/* Score Card */}
        <div style={{
          backgroundColor: "#141414",
          border: `1px solid ${scoreColor}`,
          borderRadius: "6px",
          padding: "40px",
          textAlign: "center"
        }}>
          <p style={{
            fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6A6660", marginBottom: "16px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif"
          }}>
            Match Score
          </p>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "80px",
            fontWeight: "300",
            color: scoreColor,
            lineHeight: "1",
            marginBottom: "8px"
          }}>
            {matchScore}
          </p>
          <p style={{
            fontSize: "14px", color: "#6A6660",
            fontFamily: "'Helvetica Neue', Arial, sans-serif"
          }}>
            out of 100
          </p>
          <p style={{
            marginTop: "16px", fontSize: "14px", fontWeight: "600",
            color: scoreColor, fontFamily: "'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.05em"
          }}>
            {matchScore >= 70 ? "Strong Match" : matchScore >= 40 ? "Moderate Match" : "Low Match"}
          </p>
        </div>

        <div className="match-grid">

          {/* Missing Skills */}
          <div style={{
            backgroundColor: "#1a0000",
            border: "1px solid #E05555",
            borderRadius: "6px",
            padding: "28px"
          }}>
            <p style={{
              fontSize: "20px", color: "#E05555", fontWeight: "600",
              marginBottom: "16px", fontFamily: "Georgia, serif",
              borderBottom: "1px solid rgba(224,85,85,0.2)", paddingBottom: "12px"
            }}>
              Missing Skills
            </p>
            {missingSkills && missingSkills.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {missingSkills.map((skill, i) => (
                  <li key={i} style={{
                    color: "#C8C4C0", fontSize: "15px", fontWeight: "600",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    lineHeight: "1.6"
                  }}>
                    — {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#4CAF7C", fontSize: "14px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                No missing skills found!
              </p>
            )}
          </div>

          {/* Suggestions */}
          <div style={{
            backgroundColor: "#1a1400",
            border: "1px solid #fbbf24",
            borderRadius: "6px",
            padding: "28px"
          }}>
            <p style={{
              fontSize: "20px", color: "#fbbf24", fontWeight: "600",
              marginBottom: "16px", fontFamily: "Georgia, serif",
              borderBottom: "1px solid rgba(251,191,36,0.2)", paddingBottom: "12px"
            }}>
              Suggestions
            </p>
            {suggestions && suggestions.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {suggestions.map((s, i) => (
                  <li key={i} style={{
                    color: "#C8C4C0", fontSize: "15px", fontWeight: "600",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    lineHeight: "1.6"
                  }}>
                    — {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#4CAF7C", fontSize: "14px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                No suggestions!
              </p>
            )}
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button
            className="result-btn"
            onClick={onBack}
            style={{
              padding: "14px 40px", backgroundColor: "#C9A84C", color: "#0A0A0A",
              fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              fontWeight: "600", border: "none", borderRadius: "4px", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "transform 0.15s ease"
            }}
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default MatchResultPage;