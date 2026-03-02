import { useState } from "react";
import { useApp } from "../context/AppContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CompanyDetails() {
  const { currentTender, bidItems, setTenderResults } = useApp();

  /* ================= COMPANY FORM ================= */

  const [company, setCompany] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= CLEAN SUMMARY ================= */

  const cleanSummary = (text: string) => {
    return text.replace(/[^\x20-\x7E\n]/g, "");
  };

  /* ================= GENERATE PDF ================= */

  const generatePDF = () => {
    if (!currentTender || bidItems.length === 0) {
      alert("No bid data available");
      return;
    }

    const doc = new jsPDF();

    const product = currentTender.matchedProducts[0].product;
    const bid = bidItems[0];

    const quantity = 8000;
    const total = bid.bidPrice * quantity;
    const discount =
      ((bid.basePrice - bid.bidPrice) / bid.basePrice) * 100;

    let y = 20;

    /* ---------- TITLE ---------- */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Auto Tender Proposal", 105, y, { align: "center" });

    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);

    y += 12;

    /* ---------- COMPANY DETAILS TABLE ---------- */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Company Details", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Field", "Value"]],
      body: [
        ["Company", company.name],
        ["Address", company.address],
        ["Contact", company.contact],
        ["Email", company.email],
        ["Phone", company.phone],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    y = (doc as any).lastAutoTable.finalY + 12;

    /* ---------- TENDER SUMMARY ---------- */

    doc.setFont("helvetica", "bold");
    doc.text("Tender Summary", 14, y);

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(
      cleanSummary(currentTender.summary),
      180
    );

    doc.text(lines, 14, y + 8);

    y += lines.length * 6 + 12;

    /* ---------- PRODUCT DETAILS ---------- */

    doc.setFont("helvetica", "bold");
    doc.text("Selected Product & Technical Details", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Field", "Value"]],
      body: [
        ["Name", product.name],
        ["Type", product.type],
        ["Finish", product.finish],
        ["VOC", product.voc],
        ["Packaging", product.packaging],
        ["Coverage", product.coverage],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    y = (doc as any).lastAutoTable.finalY + 12;

    /* ---------- COMMERCIAL BID ---------- */

    doc.setFont("helvetica", "bold");
    doc.text("Commercial Bid (Selected)", 14, y);

    autoTable(doc, {
      startY: y + 5,
      head: [["Metric", "Value"]],
      body: [
        ["Base Price / Litre", `₹ ${bid.basePrice.toFixed(2)}`],
        ["Bid Price / Litre", `₹ ${bid.bidPrice.toFixed(2)}`],
        ["Profit Margin", `${bid.margin}%`],
        ["Discount Offered", `${discount.toFixed(2)}%`],
        ["Quantity", `${quantity} Litres`],
        ["Total Bid Value", `₹ ${total.toFixed(2)}`],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    /* ---------- SAVE PDF ---------- */

    doc.save("final_tender_proposal.pdf");

    /* ---------- SAVE HISTORY ---------- */

    if (currentTender) {
  setTenderResults(prev => [
    ...prev,
    {
      ...currentTender,
      status: "Completed",
    },
  ]);
}
  };

  /* ================= UI ================= */

  return (
    <div className="container mx-auto py-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Company Details</h1>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Company Name"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Company Address"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact Person"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-2 w-full"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Generate Final Tender Proposal
      </button>
    </div>
  );
}