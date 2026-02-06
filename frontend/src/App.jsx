import { useState } from "react";
import Upload from "./components/Upload.jsx";
import DocumentList from "./components/DocumentList.jsx";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          Mini Document Manager
        </h1>

        <Upload onUpload={() => setRefresh((r) => r + 1)} />

        <DocumentList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
