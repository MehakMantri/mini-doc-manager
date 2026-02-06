import { useEffect, useState } from "react";
import { fetchDocuments, downloadDocument } from "../api";

export default function DocumentList({ refresh }) {
  const [docs, setDocs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch docs
  useEffect(() => {
    setLoading(true);
    fetchDocuments({ page, pageSize, search, sort }).then((res) => {
      setDocs(res.data);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page, search, sort, refresh]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h3 className="font-semibold mb-3">Documents</h3>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <input
          className="border px-3 py-1 rounded w-64"
          placeholder="Search by title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          className="border px-3 py-1 rounded"
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Title</th>
              <th className="border px-3 py-2">Size</th>
              <th className="border px-3 py-2">Upload Date</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && docs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No documents found
                </td>
              </tr>
            )}

            {!loading &&
              docs.map((doc) => (
                <tr key={doc._id}>
                  <td className="border px-3 py-2">
                    {doc.title}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {Math.round(doc.size / 1024)} KB
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => downloadDocument(doc._id)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
