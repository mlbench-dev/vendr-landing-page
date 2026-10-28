import { lazy } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
const Discover = lazy(() => import('@/pages/Discover'));
const VendorProfile = lazy(() => import('@/pages/VendorProfile'));
const ForVendors = lazy(() => import('@/pages/ForVendors'));
const JoinVendor = lazy(() => import('@/pages/JoinVendor'));
const About = lazy(() => import('@/pages/About'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Safety = lazy(() => import('@/pages/Safety'));
const Faq = lazy(() => import('@/pages/Faq'));
const Download = lazy(() => import('@/pages/Download'));
const Contact = lazy(() => import('@/pages/Contact'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const PAGES = [
  ["discover", <Discover />],
  ["vendor/:id", <VendorProfile />],
  ["vendors", <ForVendors />],
  ["vendors/join", <JoinVendor />],
  ["about", <About />],
  ["how-it-works", <HowItWorks />],
  ["safety", <Safety />],
  ["faq", <Faq />],
  ["download", <Download />],
  ["contact", <Contact />],
  ["privacy", <Legal doc="privacy" />],
  ["terms", <Legal doc="terms" />],
];

// The old /legal page had #privacy, #terms, #safety and #support sections.
function LegalRedirect({ prefix }) {
  const { hash } = useLocation();
  const to = { "#terms": "/terms", "#safety": "/safety", "#support": "/contact" }[hash] || "/privacy";
  return <Navigate to={prefix + to} replace />;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {["", "/es"].map((prefix) => (
        <Route key={prefix || "en"} path={prefix || "/"} element={<SiteLayout />}>
          <Route index element={<Home />} />
          {PAGES.map(([path, el]) => <Route key={path} path={path} element={el} />)}
          <Route path="legal" element={<LegalRedirect prefix={prefix} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App