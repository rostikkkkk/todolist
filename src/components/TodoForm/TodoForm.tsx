import { useState } from 'react';

interface TodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
  isLoading: boolean;
}

export default function TodoForm({ onAddTodo, isLoading }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) return;

    setNewTodo('');

    try {
      await onAddTodo(trimmedTodo);
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  const isButtonDisabled = !newTodo.trim() || isLoading;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        className="border p-3 w-full rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`mt-4 w-[200px] p-3 font-bold transition-all rounded-md border-2 ${
          isButtonDisabled
            ? 'bg-gray-400 cursor-not-allowed text-gray-200 border-gray-400'
            : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600'
        }`}
        disabled={isButtonDisabled}
      >
        Add Todo
      </button>
    </form>
  );
}
