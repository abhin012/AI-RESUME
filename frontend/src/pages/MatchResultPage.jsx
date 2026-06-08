function MatchResultPage({ matchResult, onBack }) {
  const { matchScore, missingSkills, suggestions } = matchResult;

  const scoreColor = matchScore >= 70 ? "#4CAF7C" : matchScore >= 40 ? "#fbbf24" : "#E05555";

  const styles = `
    .back-btn:hover { transform: scale(1.03); }
    .back-btn:active { transform: scale(0.97); }

    .match-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 16px;
      flex: 1;
    }

    .match-card {
      overflow-y: auto;
      max-height: 280px;
    }

    @media (max-width: 600px) {
      .match-grid { grid-template-columns: 1fr; }
      .match-card { max-height: 200px; }
    }
  `;

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#0A0A0A",
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <style>{styles}</style>

      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px"
      }}>
        <button
          className="back-btn"
          onClick={onBack}
          style={{
            padding: "8px 18px",
            backgroundColor: "transparent",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#C9A84C",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: "600",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "transform 0.15s ease"
          }}
        >
          ← Back
        </button>

        <h1
          onClick={onBack}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            fontWeight: "300",
            letterSpacing: "0.4em",
            color: "#C9A84C",
            cursor: "pointer",
            margin: 0
          }}
        >
          RESUME AI
        </h1>

        <div style={{ width: "80px" }} />
      </div>

      {/* Gold line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        marginBottom: "16px"
      }} />

      <p style={{
        fontSize: "11px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#C9A84C",
        textAlign: "center",
        marginBottom: "16px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
        Job Match Report
      </p>

      {/* Score Card */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px"
      }}>
        <div style={{
          backgroundColor: "#141414",
          border: `2px solid ${scoreColor}`,
          borderRadius: "6px",
          padding: "28px 48px",
          textAlign: "center",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          minWidth: "240px"
        }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            margin: 0
          }}>
            Match Score
          </p>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "64px",
            fontWeight: "300",
            color: scoreColor,
            lineHeight: "1",
            margin: 0
          }}>
            {matchScore}
          </p>
          <p style={{
            fontSize: "13px",
            color: "#9a9590",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            margin: 0
          }}>
            out of 100
          </p>
          <p style={{
            fontSize: "15px",
            fontWeight: "700",
            color: scoreColor,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.08em",
            margin: 0
          }}>
            {matchScore >= 70 ? "Strong Match" : matchScore >= 40 ? "Moderate Match" : "Low Match"}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="match-grid">

        <div className="match-card" style={{
          backgroundColor: "#1a0000",
          border: "1px solid #E05555",
          borderRadius: "6px",
          padding: "20px"
        }}>
          <p style={{
            fontSize: "18px",
            color: "#E05555",
            fontWeight: "600",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
            borderBottom: "1px solid rgba(224,85,85,0.2)",
            paddingBottom: "10px"
          }}>
            Missing Skills
          </p>
          {missingSkills && missingSkills.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {missingSkills.map((skill, i) => (
                <li key={i} style={{
                  color: "#D0CCC8",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  lineHeight: "1.5"
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

        <div className="match-card" style={{
          backgroundColor: "#1a1400",
          border: "1px solid #fbbf24",
          borderRadius: "6px",
          padding: "20px"
        }}>
          <p style={{
            fontSize: "18px",
            color: "#fbbf24",
            fontWeight: "600",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
            borderBottom: "1px solid rgba(251,191,36,0.2)",
            paddingBottom: "10px"
          }}>
            Suggestions
          </p>
          {suggestions && suggestions.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {suggestions.map((s, i) => (
                <li key={i} style={{
                  color: "#D0CCC8",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  lineHeight: "1.5"
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
    </div>
  );
}

export default MatchResultPage;