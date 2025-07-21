
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/analyze-prompt', { prompt });
      setResult(response.data);
    } catch (error) {
      alert('Error analyzing prompt.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Prompt Engineering Copilot</h1>

      <textarea
        className="w-full border rounded p-4 h-40 mb-4"
        placeholder="Paste your raw prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Optimize Prompt'}
      </button>

      {result && (
        <div className="bg-white mt-8 rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
          <ul className="list-disc pl-6 mb-4">
            {result.suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
          </ul>

          <h2 className="text-xl font-semibold mb-2">Explanations</h2>
          <ul className="list-disc pl-6 mb-4">
            {result.explanations.map((e, idx) => <li key={idx}>{e}</li>)}
          </ul>

          <p className="text-sm text-gray-500">Estimated Tokens: {result.token_estimate}</p>
        </div>
      )}
    </div>
  );
}
