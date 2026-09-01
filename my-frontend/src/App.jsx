import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProject from "./pages/admin/AddProject";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminDonation from "./pages/admin/AdminDonation";
import WebsiteContent from "./pages/admin/WebsiteContent";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import { PageContentProvider } from "./context/PageContentContext";
import Projects from "./pages/Projects";

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar only on public pages */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* ==========================
              PUBLIC ROUTES
          ========================== */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/donate" element={<Donate />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/login" element={<Login />} />

          {/* ==========================
              ADMIN ROUTES
          ========================== */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />

            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="add"
              element={<AddProject />}
            />

            <Route
              path="members"
              element={<AdminMembers />}
            />

            <Route
              path="donations"
              element={<AdminDonation />}
            />

            <Route
              path="website-content"
              element={<WebsiteContent />}
            />
          </Route>

          {/* ==========================
              FALLBACK
          ========================== */}

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Show Footer only on public pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <PageContentProvider>
      <Router>
        <AppContent />
      </Router>
    </PageContentProvider>
  );
}