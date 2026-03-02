// src/pages/ViewProducts.tsx
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ViewProducts() {
  const { products } = useApp();
const [editId, setEditId] = useState<string | null>(null);
  
  const [form, setForm] = useState<any>({});

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const saveEdit = (p: any) => {
    Object.assign(p, form);
    setEditId(null);
  };

  const deleteProduct = (id: string) => {
    const index = products.findIndex(
      (p) => p.id === id
    );
    if (index > -1) products.splice(index, 1);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">
        Product Catalogue
      </h1>

      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-6 mb-5 bg-white/70 shadow"
        >
          {editId && editId === p.id ? (
            <>
              {Object.keys(p).map((key) =>
                key !== "id" ? (
                  <input
                    key={key}
                    className="border p-2 mr-2 mb-2"
                    defaultValue={p[key]}
                    onChange={(e) =>
                      updateField(key, e.target.value)
                    }
                  />
                ) : null
              )}

              <button
                onClick={() => saveEdit(p)}
                className="text-green-600 mr-4"
              >
                ✔ Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                {p.name}
              </h2>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <p>Type: {p.type}</p>
                <p>Finish: {p.finish}</p>
                <p>VOC: {p.voc}</p>
                <p>Coverage: {p.coverage}</p>
                <p>Packaging: {p.packaging}</p>
                <p>Location: {p.location}</p>
                <p className="font-semibold text-green-700">
                  ₹ {p.price_per_litre}
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setEditId(p.id);
                    setForm(p);
                  }}
                  className="text-green-600 mr-6"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}