import { useApp } from "../context/AppContext";

export default function BestMatch() {
  const { currentTender } = useApp();

  if (!currentTender) {
    return <div className="p-10">No Tender</div>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Best Matches</h1>

      {currentTender.matchedProducts?.length ? (
        currentTender.matchedProducts.map((m, i) => (
          <div key={i} className="border p-4 mb-4 rounded">
            <h2 className="font-semibold text-lg">
              {m.product.name}
            </h2>

            <p>Finish: {m.product.finish}</p>
            <p>Coverage: {m.product.coverage}</p>
            <p>Price: ₹{m.product.price_per_litre}</p>

            <p className="mt-2">
              Match Score: {(m.score * 100).toFixed(1)}%
            </p>

            <p>Gap: {m.gap.toFixed(2)}</p>

            <p className="text-blue-600">
              Suggestion: {m.suggestion}
            </p>
          </div>
        ))
      ) : (
        <p>No matches available</p>
      )}
    </div>
  );
}