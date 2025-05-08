import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DmlForm() {
  const [kalimat, setKalimat] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kalimat || !file) {
      alert('Please enter a kalimat and upload a JSON file.');
      return;
    }

    const formData = new FormData();
    formData.append('kalimat', kalimat);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/dml/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">DML Detector</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Kalimat</label>
          <input
            type="text"
            className="form-control"
            value={kalimat}
            onChange={(e) => setKalimat(e.target.value)}
            placeholder="Contoh: Tampilkan semua data mahasiswa"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload JSON File</label>
          <input
            type="file"
            className="form-control"
            accept=".json"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h5>Result:</h5>
          <pre className="bg-light p-3 border rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DmlForm;
