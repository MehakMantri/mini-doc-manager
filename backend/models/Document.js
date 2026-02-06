const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true } // createdAt used as upload date
);

module.exports = mongoose.model("Document", documentSchema);
