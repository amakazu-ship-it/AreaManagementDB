import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CaseListPage } from "./pages/CaseListPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CaseListPage />} />
        <Route path="/cases/:caseId" element={<CaseDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
