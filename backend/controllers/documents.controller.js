const fs = require("fs");
const Document = require("../models/Document");

// Upload documents
exports.uploadDocuments = async (req, res) => {
  try {
    const docs = req.files.map((file) => ({
      title: file.originalname,
      filename: file.filename,
      filepath: file.path,
      size: file.size,
    }));

    const savedDocs = await Document.insertMany(docs);
    res.status(201).json(savedDocs);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

// List documents (pagination + search + sort)
exports.listDocuments = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      sort = "desc",
      search = "",
    } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const documents = await Document.find(query)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const total = await Document.countDocuments(query);

    res.json({
      data: documents,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

// ✅ DOWNLOAD DOCUMENT (STREAMING) — ADD IT HERE
exports.downloadDocument = async (req, res) => {
  const doc = await Document.findById(req.params.id);

  if (!doc) {
    return res.status(404).json({ error: "Document not found" });
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${doc.title}"`
  );

  fs.createReadStream(doc.filepath).pipe(res);
};
