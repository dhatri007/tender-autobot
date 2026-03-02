import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BidRecommendation() {
  const { products, setBidItems } = useApp();
  const navigate = useNavigate();

  const [threshold, setThreshold] = useState(10);
  const [tableData, setTableData] = useState<any[]>([]);
  const [calculated, setCalculated] = useState(false);

  const quantity = 8000;

  /* -------------------------------- */
  /* CALCULATE TABLE AFTER CONFIRM */
  /* -------------------------------- */

  const calculateRecommendation = () => {
    if (!products.length) {
      alert("Upload products first");
      return;
    }

    const product = products[0];
    const basePrice = Number(product.price_per_litre);

    if (!basePrice || isNaN(basePrice)) {
      alert("Product price missing");
      return;
    }

    /**
     * Threshold controls aggressiveness
     * Higher threshold = smaller discount
     */
    const aggressiveness = Math.max(
      1,
      20 - threshold
    );

    const discounts = [
      0,
      aggressiveness * 0.2,
      aggressiveness * 0.4,
      aggressiveness * 0.6,
      aggressiveness * 0.8,
    ];

    const rows = discounts.map((d) => {
      const discount = Number(d.toFixed(2));

      const price =
        basePrice - (basePrice * discount) / 100;

      const total = price * quantity;

      const costPrice = basePrice * 0.75;

      const profit =
        ((price - costPrice) / price) * 100;

      const probability =
        0.5 + discount * 0.03;

      return {
        discount,
        price,
        total,
        profit,
        probability,
      };
    });

    setTableData(rows);
    setCalculated(true);
  };

  /* -------------------------------- */
  /* GENERATE BID */
  /* -------------------------------- */

  const generateBid = () => {
  if (!products.length) {
    alert("Upload products first");
    return;
  }

  const product = products[0];

  const basePrice = Number(product.price_per_litre);

  if (!basePrice || isNaN(basePrice)) {
    alert("Product price missing — upload CSV correctly");
    return;
  }

  /* example best calculation */
  const margin = threshold;
  const bidPrice = basePrice * (1 - margin / 100);

  setBidItems([
    {
      id: Date.now().toString(),
      productName: product.name,
      basePrice: basePrice,
      bidPrice: bidPrice,
      margin: margin,
    },
  ]);

  navigate("/company-details");
};

  /* -------------------------------- */
  /* UI */
  /* -------------------------------- */

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">
        Bid Recommendation
      </h1>

      {/* THRESHOLD INPUT */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">
          Profit Threshold (%)
        </label>

        <input
          type="number"
          value={threshold}
          onChange={(e) =>
            setThreshold(Number(e.target.value))
          }
          className="border p-2 rounded w-28"
        />

        {/* ✅ CONFIRM BUTTON */}
        <button
          onClick={calculateRecommendation}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>
      </div>

      {/* TABLE */}
      {calculated && (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Discount %</th>
                <th className="p-3 border">
                  Price / Litre
                </th>
                <th className="p-3 border">
                  Total Bid Value
                </th>
                <th className="p-3 border">Profit %</th>
                <th className="p-3 border">
                  Win Probability
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-blue-50"
                >
                  <td className="border p-2">
                    {row.discount.toFixed(2)}%
                  </td>

                  <td className="border p-2">
                    ₹{row.price.toFixed(2)}
                  </td>

                  <td className="border p-2">
                    ₹{row.total.toLocaleString()}
                  </td>

                  <td className="border p-2">
                    {row.profit.toFixed(2)}%
                  </td>

                  <td className="border p-2">
                    {(row.probability * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* GENERATE BUTTON */}
      {calculated && (
        <button
          onClick={generateBid}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Generate Bid
        </button>
      )}
    </div>
  );
}