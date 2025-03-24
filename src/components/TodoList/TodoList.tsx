import TodoItem from '@/components/TodoItem/TodoItem';
import { Todo } from '@/lib/types';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}
