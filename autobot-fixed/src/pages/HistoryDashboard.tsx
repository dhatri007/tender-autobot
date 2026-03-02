import { useApp } from "../context/AppContext";

export default function HistoryDashboard() {
  const { tenderResults } = useApp();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">History</h1>

      <table className="w-full border">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tenderResults.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}