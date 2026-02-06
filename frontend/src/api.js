const API_BASE = "http://localhost:4000/api/documents";

export async function fetchDocuments(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}?${query}`);
  return res.json();
}

export async function uploadDocuments(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export function downloadDocument(id) {
  window.open(`${API_BASE}/${id}/download`);
}
