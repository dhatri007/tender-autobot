import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function UploadProducts() {
  const { products, setProducts } = useApp();

  const [form, setForm] = useState({
    name: "",
    type: "",
    finish: "",
    voc: "",
    coverage: "",
    price_per_litre: "",
    packaging: "",
    location: "",
  });

/* ================= CSV UPLOAD ================= */

const uploadCSV = async (file: File) => {
  const text = await file.text();

  const rows = text.split("\n").slice(1);

  const parsed = rows
    .filter((r) => r.trim() !== "")
    .map((row, index) => {
      const c = row.split(",");

      return {
        id: `${Date.now()}-${index}`,

        name: c[0] ?? "",
        type: c[1] ?? "",
        finish: c[2] ?? "",
        voc: c[3] ?? "",

        // ✅ FIX (MOST IMPORTANT)
        coverage: Number(c[4]) || 0,

        price_per_litre: Number(c[5]) || 0,

        packaging: c[6] ?? "",
        location: c[7] ?? "",
      };
    });

  setProducts(parsed);
};

  /* ================= MANUAL ADD ================= */

  const addProduct = () => {
    if (!form.name) return;

    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: form.name,
        type: form.type,
        finish: form.finish,
        voc: form.voc,
        packaging: form.packaging,
        location: form.location,
        coverage: Number(form.coverage), // ✅ FIX
        price_per_litre: Number(form.price_per_litre), // ✅ FIX
      },
    ]);

    setForm({
      name: "",
      type: "",
      finish: "",
      voc: "",
      coverage: "",
      price_per_litre: "",
      packaging: "",
      location: "",
    });
  };

  /* ================= UI ================= */

  return (
    <div className="container py-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Upload Product Catalog
      </h1>

      {/* CSV Upload */}
      <div className="border rounded-lg p-6 mb-8 bg-card shadow">
        <h2 className="font-semibold mb-3">
          Upload CSV File
        </h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            e.target.files &&
            uploadCSV(e.target.files[0])
          }
        />
      </div>

      {/* Manual Entry */}
      <div className="border rounded-lg p-6 bg-card shadow">
        <h2 className="font-semibold mb-4">
          Add Product Manually
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key.replaceAll("_", " ")}
              value={(form as any)[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
              className="border p-2 rounded"
            />
          ))}
        </div>

        <button
          onClick={addProduct}
          className="mt-4 bg-primary text-white px-6 py-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}