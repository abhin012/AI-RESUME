import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import MatchResultPage from "./pages/MatchResultPage";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  const handleSetAnalysis = (data) => {
    setAnalysis(data);
  };

  const handleClear = () => {
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
      setMatchResult={setMatchResult}
    />
  );
}

export default App;