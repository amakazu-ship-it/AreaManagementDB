import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CasesProvider } from "./context/CasesContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CaseListPage } from "./pages/CaseListPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { SubmitCasePage } from "./pages/SubmitCasePage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <AdminAuthProvider>
      <CasesProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<CaseListPage />} />
            <Route path="/cases/:caseId" element={<CaseDetailPage />} />
            <Route path="/submit" element={<SubmitCasePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </CasesProvider>
    </AdminAuthProvider>
  );
}

export default App;
