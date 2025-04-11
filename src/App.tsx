
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CandidatesPage from "./pages/candidates";
import CandidateDetailPage from "./pages/candidates/[id]";
import CandidateShortlistPage from "./pages/candidates/shortlist";
import SimulationsPage from "./pages/simulations";
import SimulationDetailPage from "./pages/simulations/[id]";
import StatisticsPage from "./pages/statistics";
import CandidateReportPage from "./pages/candidates/[id]/report";
import { UserTierProvider } from "./contexts/UserTierContext";
import ApiKeysPage from "./pages/admin/api-keys";
import ApiDocsPage from "./pages/admin/api-docs";
import ReportSettingsPage from "./pages/admin/report-settings";
import CompanySettingsPage from "./pages/admin/company-settings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <UserTierProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/candidates" element={
                <ProtectedRoute>
                  <CandidatesPage />
                </ProtectedRoute>
              } />
              <Route path="/candidates/shortlist" element={
                <ProtectedRoute>
                  <CandidateShortlistPage />
                </ProtectedRoute>
              } />
              <Route path="/candidates/:id" element={
                <ProtectedRoute>
                  <CandidateDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/candidates/:id/report" element={
                <ProtectedRoute>
                  <CandidateReportPage />
                </ProtectedRoute>
              } />
              <Route path="/simulations" element={
                <ProtectedRoute>
                  <SimulationsPage />
                </ProtectedRoute>
              } />
              <Route path="/simulations/:id" element={
                <ProtectedRoute>
                  <SimulationDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/statistics" element={
                <ProtectedRoute>
                  <StatisticsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/api-keys" element={
                <ProtectedRoute>
                  <ApiKeysPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/api-docs" element={
                <ProtectedRoute>
                  <ApiDocsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/report-settings" element={
                <ProtectedRoute>
                  <ReportSettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/company-settings" element={
                <ProtectedRoute>
                  <CompanySettingsPage />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserTierProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
