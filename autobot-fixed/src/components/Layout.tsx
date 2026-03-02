import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">

      {/* ---------- NAVBAR ---------- */}
      <nav className="w-full backdrop-blur bg-white/70 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex gap-6 px-6 py-4 font-medium">

          <Link to="/">Home</Link>
          <Link to="/upload-products">Upload Products</Link>
          <Link to="/view-products">View Products</Link>
          <Link to="/best-match">Best Match</Link>
          <Link to="/bid-recommendation">Bid Recommendation</Link>
          <Link to="/company-details">Company Details</Link>
          <Link to="/history">History</Link>

        </div>
      </nav>

      {/* ---------- PAGE AREA ---------- */}
      <main className="flex-1 relative">

        {/* Background splash ONLY for inner pages */}
        {!isHome && (
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(167,139,250,0.75), transparent 40%)," +
                "radial-gradient(circle at 80% 70%, rgba(196,181,253,0.65), transparent 45%)," +
                "hsl(260 40% 95%)",
            }}
          />
        )}

        <Outlet />
      </main>
    </div>
  );
}