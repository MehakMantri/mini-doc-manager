const express = require("express");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/documents.controller");

const router = express.Router();

router.post("/upload", upload.array("files"), controller.uploadDocuments);
router.get("/", controller.listDocuments);

// THIS LINE CONNECTS THE STREAMING CODE
router.get("/:id/download", controller.downloadDocument);

module.exports = router;
