import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProject from "./pages/admin/AddProject";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminDonation from "./pages/admin/AdminDonation";
import Gallery from "./pages/Gallery";
import {
  PageContentProvider,
} from "./context/PageContentContext";

export default function App() {
  return (
    <PageContentProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>

              {/* PUBLIC ROUTES */}

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/donations" element={<AdminDonation />} />
              <Route path="/gallery" element={<Gallery />} />

              {/* 🔒 PROTECTED ROUTES */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/add"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />

              {/* OPTIONAL: fallback */}

              <Route
                path="*"
                element={<Home />}
              />

            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </PageContentProvider>
  );
}