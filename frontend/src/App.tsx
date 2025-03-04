import { useState, useEffect } from 'react';
import './App.css';

function Heading({ title }: { title: string }) {
  return <h1 className="text-white text-2xl font-bold">{title}</h1>;
}

function App() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmittedName(data.name);
        fetchNames(); // Refresh names list
      }
    } catch (error) {
      console.error('Error submitting name:', error);
    }
  };

  const fetchNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/names');
      const data = await response.json();
      setNames(data.map((entry: { name: string }) => entry.name));
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Heading title="Greetings my frienibels!" />
      <div className="flex mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded text-black"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 px-4 py-1 bg-black text-white font-bold rounded"
        >
          gorabels!
        </button>
      </div>
      {submittedName && <p className="mt-4">Hello, {submittedName}!</p>}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Saved Names:</h2>
        <ul>
          {names.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
