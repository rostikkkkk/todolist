import { Todo } from '@/lib/types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <li
      className={`flex justify-between items-center p-4 border rounded-lg shadow-md mb-2 transition-all ${
        todo.completed ? 'bg-green-100' : 'bg-white'
      } hover:scale-101 hover:shadow-lg`}
    >
      <span
        className={`flex-1 break-words text-black ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 text-red-500 cursor-pointer transition-all bg-transparent border-2 border-red-500 rounded-md py-2 px-4 hover:bg-red-500 hover:text-white"
      >
        Delete
      </button>
    </li>
  );
}
