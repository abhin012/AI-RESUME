import { useState, useEffect } from "react";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import MatchResultPage from "./pages/MatchResultPage";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    const savedAnalysis = sessionStorage.getItem("analysis");
    const savedMatch = sessionStorage.getItem("matchResult");
    if (savedAnalysis) setAnalysis(savedAnalysis);
    if (savedMatch) setMatchResult(JSON.parse(savedMatch));
  }, []);

  const handleSetAnalysis = (data) => {
    sessionStorage.setItem("analysis", data);
    setAnalysis(data);
  };

  const handleSetMatchResult = (data) => {
    sessionStorage.setItem("matchResult", JSON.stringify(data));
    setMatchResult(data);
  };

  const handleClear = () => {
    sessionStorage.clear();
    localStorage.removeItem("resumeAnalysis");
    setAnalysis(null);
    setMatchResult(null);
  };

  if (analysis !== null) {
    return <ResultPage analysis={analysis} setAnalysis={handleClear} />;
  }

  if (matchResult !== null) {
    return <MatchResultPage matchResult={matchResult} onBack={handleClear} />;
  }

  return (
    <UploadPage
      setAnalysis={handleSetAnalysis}
      setMatchResult={handleSetMatchResult}
    />
  );
}

export default App;