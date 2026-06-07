import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [analysis, setAnalysis] = useState(null);

  const handleSetAnalysis = (data) => {
    setAnalysis(data);
  };

  const handleClear = () => {
    localStorage.removeItem("resumeAnalysis");
    setAnalysis(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A" }}>
      {analysis === null ? (
        <UploadPage setAnalysis={handleSetAnalysis} />
      ) : (
        <ResultPage analysis={analysis} setAnalysis={handleClear} />
      )}
    </div>
  );
}

export default App;