const API = "http://localhost:4000";

async function upload() {
  const files = document.getElementById("files").files;
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  await fetch(`${API}/documents`, {
    method: "POST",
    body: formData,
  });

  loadDocs();
}

async function loadDocs() {
  const q = document.getElementById("search").value;
  const sortOrder = document.getElementById("sort").value;

  const res = await fetch(
    `${API}/documents?q=${q}&sortOrder=${sortOrder}`
  );
  const docs = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  if (docs.length === 0) {
    list.innerHTML = "<li>No documents found</li>";
    return;
  }

  docs.forEach((doc) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${doc.title} (${doc.size} bytes)
      <a href="${API}/documents/${doc._id}/download">Download</a>
    `;
    list.appendChild(li);
  });
}

loadDocs();
