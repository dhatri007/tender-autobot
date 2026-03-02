import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Index from "./pages/Index";
import UploadProducts from "./pages/UploadProducts";
import ViewProducts from "./pages/ViewProducts";
import BestMatch from "./pages/BestMatch";
import BidRecommendation from "./pages/BidRecommendation";
import CompanyDetails from "./pages/CompanyDetails";
import HistoryDashboard from "./pages/HistoryDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="upload-products" element={<UploadProducts />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="best-match" element={<BestMatch />} />
          <Route path="bid-recommendation" element={<BidRecommendation />} />
          <Route path="company-details" element={<CompanyDetails />} />
          <Route path="history" element={<HistoryDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}