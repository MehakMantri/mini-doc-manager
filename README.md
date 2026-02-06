# Mini Document Manager

## Objective

Design and implement a minimal document manager that supports uploading, listing, searching, and downloading documents.

This project focuses on:

* Clean API and data design
* Full-stack thinking (frontend + backend)
* Ability to explain tradeoffs and constraints

> **Note:** This solution prioritizes clarity and correctness over breadth.
> The code is intended to be read and reviewed, not executed locally.

---

## Features Implemented

### 1. Upload Documents

* Users can upload **multiple documents in a single action**
* Each document includes:

  * **Title** (defaults to filename)
  * **File**
* Backend supports **multi-file upload** using `multipart/form-data`
* Files are stored on **local disk**
* Metadata stored separately in MongoDB:

  * title
  * file size
  * upload timestamp
  * file path

---

### 2. List Documents

The frontend displays a list of uploaded documents with:

* Title
* File size
* Upload date
* Download action

Backend supports:

* Pagination (`page`, `pageSize`)
* Sorting by upload date (ascending / descending)
* Text search on title (simple “contains” search using regex)

Frontend includes:

* Search input
* Sort control
* Pagination (Prev / Next)
* Loading and empty states

---

### 3. Download Document

* Users can download a document from the list
* Backend returns files using a **streaming response**
* Files are streamed from disk using `fs.createReadStream`
* Files are **never loaded fully into memory**

---

## Tech Stack

### Backend

* Node.js
* Express
* MongoDB (Atlas / Compass)
* Mongoose
* Multer (file uploads)
* Native filesystem streams

### Frontend

* React (Vite)
* Minimal UI styling (utility-based)
* No heavy UI frameworks

---

## Architecture Overview

![architecture](diagram.png)

### Upload Flow

Frontend → Backend → Disk + MongoDB

### Download Flow

Frontend → Backend → Stream file from disk → Browser

---

## API Endpoints

### Upload Documents

```
POST /api/documents/upload
```

* Multipart form data
* Field name: `files`
* Supports multiple files in one request

---

### List Documents

```
GET /api/documents
```

Query parameters:

* `page` (default: 1)
* `pageSize` (default: 10)
* `sort` (`asc` | `desc`)
* `search` (partial title match)

---

### Download Document

```
GET /api/documents/:id/download
```

* Streams file from disk
* Sets `Content-Disposition` for download

---
## Screenshots

### Full Application View

This screenshot shows the complete application layout, including the upload section and the document listing table with pagination.

![Full page](image-2.png)

### Search by Document Title

This screenshot demonstrates the text-based search functionality.  
Documents are filtered in real time using a simple “contains” search on the title.

![Search](image-3.png)

### Search and Sort Combined

This screenshot shows search and sorting working together.  
Documents are filtered by title and sorted by upload date (newest first / oldest first).

![search-sort](image-4.png)

## Design Questions

### 1. Multiple Uploads

**How are multiple documents handled?**

* Multiple documents are uploaded in **one request**
* Multer processes multiple files in a single multipart payload
* Metadata is stored using `insertMany`

**Tradeoffs**

* Larger request size
* Simpler API and fewer network calls
* File size limits mitigate risk

---

### 2. Streaming

**Why is streaming important?**

* Streaming keeps memory usage constant
* Supports large files and concurrent downloads
* Prevents server crashes

**If full files were loaded into memory:**

* High memory usage
* Poor scalability
* Risk of process crashes under load

---

### 3. Moving to S3

**If files moved to object storage (e.g., S3):**

* Backend would upload files to S3 instead of disk
* MongoDB would store S3 object metadata
* Backend might return signed URLs
* Backend may no longer handle file bytes directly

---

### 4. Frontend UX Improvements

**If more time were available:**

* Document preview using content-type detection
* Upload progress using `XMLHttpRequest` or Axios progress events
* Better pagination indicators
* File type icons

---
## Setup Assumptions

* Local MongoDB or MongoDB Atlas is available
* Node.js is installed
* Files are stored locally
* No authentication is required

---
## Key Tradeoffs Due to Time Constraints

* One test
* No file previews
* Minimal UI styling
* No authentication

These were intentionally excluded to keep the implementation simple and explainable.


