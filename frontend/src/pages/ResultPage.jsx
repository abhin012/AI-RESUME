function ResultPage({ analysis, setAnalysis }) {

  const config = [
    { title: "Skills Found", borderColor: "#C9A84C", titleColor: "#C9A84C", bg: "#1a1600" },
    { title: "Experience Summary", borderColor: "#C9A84C", titleColor: "#C9A84C", bg: "#1a1600" },
    { title: "Strengths", borderColor: "#C9A84C", titleColor: "#C9A84C", bg: "#1a1600" },
    { title: "Weaknesses", borderColor: "#C9A84C", titleColor: "#C9A84C", bg: "#1a1600" },
    { title: "To Improve", borderColor: "#C9A84C", titleColor: "#C9A84C", bg: "#1a1600" },
  ];

  const keywords = [
    ["skills found", "skill", "technical skills"],
    ["experience summary", "experience", "work experience"],
    ["strengths", "strength"],
    ["weaknesses", "weakness"],
    ["suggestions to improve", "suggestions", "to improve", "improvements", "areas for improvement"]
  ];

  const styles = `
    .result-btn:hover { transform: scale(1.03); }
    .result-btn:active { transform: scale(0.97); }

    .cards-top {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
    }

    .cards-bottom {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      width: 66.8%;
      margin: 0 auto;
    }

    .result-title {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 0.4em;
      color: #C9A84C;
      margin-bottom: 8px;
    }

    @media (max-width: 900px) {
      .cards-top {
        grid-template-columns: 1fr 1fr;
      }
      .cards-bottom {
        grid-template-columns: 1fr 1fr;
        width: 100%;
      }
    }

    @media (max-width: 600px) {
      .cards-top {
        grid-template-columns: 1fr;
      }
      .cards-bottom {
        grid-template-columns: 1fr;
        width: 100%;
      }
      .result-title {
        font-size: 20px;
        letter-spacing: 0.2em;
      }
    }
  `;

  function extractSection(text, keywordList) {
    const lines = text.split("\n");
    let capturing = false;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase().replace(/[\*\#\:1-9\.\)]/g, "").trim();
      const isHeader = keywordList.some(k => lower === k || lower === k + ":");

      if (isHeader) {
        capturing = true;
        continue;
      }

      if (capturing) {
        const allKeywords = keywords.flat();
        const isNextHeader = allKeywords.some(k =>
          lower === k || lower === k + ":"
        );
        if (isNextHeader && lower !== "") break;
        result.push(line);
      }
    }

    return result.join("\n").trim();
  }

  const sections = keywords.map(kList => extractSection(analysis, kList));
  const allEmpty = sections.every(s => !s || s === "");

  if (allEmpty) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <style>{styles}</style>
        <div style={{
          backgroundColor: "#141414",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "6px",
          padding: "48px 32px",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center"
        }}>
          <h2 style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            fontWeight: "300",
            letterSpacing: "0.2em",
            color: "#C9A84C",
            marginBottom: "16px"
          }}>
            No Information Found
          </h2>
          <p style={{
            fontSize: "13px",
            color: "#6A6660",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            marginBottom: "32px",
            lineHeight: "1.8"
          }}>
            We could not extract any analysis from your resume. The PDF may not contain readable text.
          </p>
          <button
            className="result-btn"
            onClick={() => setAnalysis(null)}
            style={{
              padding: "14px 40px",
              backgroundColor: "#C9A84C",
              color: "#0A0A0A",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: "600",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "transform 0.15s ease"
            }}
          >
            Upload Different Resume
          </button>
        </div>
      </div>
    );
  }

  function renderCard(content, index) {
    const c = config[index];
    return (
      <div key={index} style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.borderColor}`,
        borderRadius: "6px",
        padding: "20px 28px"
      }}>
        <p style={{
          fontSize: "20px",
          letterSpacing: "0.05em",
          color: c.titleColor,
          fontWeight: "600",
          marginBottom: "16px",
          fontFamily: "Georgia, serif",
          borderBottom: `1px solid ${c.borderColor}40`,
          paddingBottom: "12px"
        }}>
          {c.title}
        </p>
        <p style={{
          color: "#C8C4C0",
          fontSize: "15px",
          lineHeight: "1.7",
          whiteSpace: "pre-wrap",
          fontWeight: "600",
          letterSpacing: "0.02em"
        }}>
          {content}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0A0A0A",
      padding: "40px 20px"
    }}>
      <style>{styles}</style>
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            className="result-title"
            onClick={() => setAnalysis(null)}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "28px",
              fontWeight: "300",
              letterSpacing: "0.4em",
              color: "#C9A84C",
              marginBottom: "8px",
              cursor: "pointer"
            }}
          >
            RESUME AI
          </h1>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6A6660",
            marginBottom: "24px",
            fontFamily: "'Helvetica Neue', Arial, sans-serif"
          }}>
            Analysis Report
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)"
          }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="cards-top">
            {sections.slice(0, 3).map((content, index) => renderCard(content, index))}
          </div>
          <div className="cards-bottom">
            {sections.slice(3).map((content, index) => renderCard(content, index + 3))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button
            className="result-btn"
            onClick={() => setAnalysis(null)}
            style={{
              padding: "14px 40px",
              backgroundColor: "#C9A84C",
              color: "#0A0A0A",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: "600",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "transform 0.15s ease"
            }}
          >
            Analyse Another Resume
          </button>
        </div>

      </div>
    </div>
  );
}

export default ResultPage;