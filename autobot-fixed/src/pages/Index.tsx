import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import hero from "../assets/hero.jpg";

export default function Index() {
  const navigate = useNavigate();
  const { products, setCurrentTender } = useApp();

  /* ================= UPLOAD TENDER ================= */

  const uploadTender = async (file: File) => {
    const text = await file.text();

    setCurrentTender({
      id: Date.now().toString(),
      fileName: file.name,
      summary: text,
      matchedProducts: [],
      status: "uploaded",
    });

    alert("Tender uploaded successfully ✅");
  };

  /* ================= PROCESS ================= */

  const processTender = () => {
    if (!products.length) {
      alert("Upload products first!");
      return;
    }

    navigate("/best-match");
  };

  /* ================= UI ================= */

  return (
    <div className="container mx-auto grid lg:grid-cols-2 gap-10 py-14 items-center">

      {/* LEFT */}
      <div>
        <h1 className="text-5xl font-bold mb-6">
          Auto Tender Assistant
        </h1>

        <p className="text-lg mb-8 text-gray-600">
          Upload tender documents and generate intelligent bid
          recommendations automatically.
        </p>

        {/* Upload Tender */}
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={(e) =>
            e.target.files &&
            uploadTender(e.target.files[0])
          }
          className="mb-6 block"
        />

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/upload-products")}
            className="px-6 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700"
          >
            Upload Products
          </button>

          <button
            onClick={processTender}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-purple-600 text-purple-700 hover:bg-purple-50"
          >
            Process Tender
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center">
        <img
          src={hero}
          alt="hero"
          className="w-[50%] h-[70vh] object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}