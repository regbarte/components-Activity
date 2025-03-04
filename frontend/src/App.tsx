import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Heading({ title }: { title: string }) {
  return <h1 className="text-white text-2xl font-bold">{title}</h1>;
}

function NameInput({ name, setName }: { name: string; setName: (value: string) => void }) {
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="px-2 py-1 border rounded text-black"
      placeholder="Enter your name"
    />
  );
}

function SubmitButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="ml-2 px-4 py-1 bg-black text-white font-bold rounded">
      gorabels!
    </button>
  );
}

function NameItem({ name, onDelete }: { name: string; onDelete: (name: string) => void }) {
  return (
    <li className="flex justify-between items-center">
      {name}
      <DeleteButton onClick={() => onDelete(name)} />
    </li>
  );
}

function NameList({ names, onDelete }: { names: string[]; onDelete: (name: string) => void }) {
  return (
    <ul>
      {names.map((n, index) => (
        <NameItem key={index} name={n} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="ml-4 px-2 py-1 bg-red-600 text-white text-sm rounded">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

function GreetingMessage({ message }: { message: string }) {
  return <p className="text-green-500">{message}</p>;
}

function LoadingSpinner() {
  return <div className="loader">Loading...</div>;
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-500">{message}</p>;
}

function Footer() {
  return <footer className="mt-8 text-gray-500">footer</footer>;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-4">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="px-2 py-1 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  );
}

function App() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
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
      } else {
        setError('Failed to submit name');
      }
    } catch (error) {
      setError('Error submitting name');
    } finally {
      setLoading(false);
    }
  };

  const fetchNames = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/names');
      const data = await response.json();
      setNames(data.map((entry: { name: string }) => entry.name));
    } catch (error) {
      setError('Error fetching names');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (nameToDelete: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/delete-name', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameToDelete }),
      });

      if (response.ok) {
        fetchNames(); // Refresh list after deletion
      } else {
        setError('Failed to delete name');
      }
    } catch (error) {
      setError('Error deleting name');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Heading title="Greetings my frienibels!" />
      <div className="flex mt-4">
        <NameInput name={name} setName={setName} />
        <SubmitButton onClick={handleSubmit} />
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {submittedName && <GreetingMessage message={`Hello, ${submittedName}!`} />}
      <div className="mt-6">
        <h2 className="text-lg">Saved Names:</h2>
        <NameList names={names} onDelete={handleDelete} />
      </div>
      <Counter />
      <Footer />
    </div>
  );
}

export default App;