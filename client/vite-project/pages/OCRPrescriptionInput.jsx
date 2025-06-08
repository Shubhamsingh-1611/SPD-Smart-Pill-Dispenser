import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function OCRPrescriptionInput() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleScan = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-[100px]">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded" onClick={handleScan}>
        Scan Prescription
      </button>
      {loading && <p className="mt-2">Scanning...</p>}
      {text && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Extracted Text:</h3>
          <pre className="text-sm">{text}</pre>
        </div>
      )}
    </div>
    
  );
}
