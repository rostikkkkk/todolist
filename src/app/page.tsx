'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchTodos } from '@/app/api/todos';
import Spinner from '@/components/Spinner/Spinner';
import TodoForm from '@/components/TodoForm/TodoForm';
import TodoList from '@/components/TodoList/TodoList';
import { useTodoMutations } from '@/lib/hooks/useTodoMutations';
import { Todo } from '@/lib/types';

export default function Home() {
  const { addTodoMutation, deleteTodoMutation } = useTodoMutations();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 300000,
  });

  const addTodo = async (title: string) => {
    addTodoMutation.mutate(title);
  };

  const deleteTodo = useCallback(
    async (id: number) => {
      deleteTodoMutation.mutate(id);
    },
    [deleteTodoMutation],
  );

  if (isError) {
    return (
      <div className="mx-auto mt-10 px-4">
        <p className="text-center text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  const todosList = todos ?? [];

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-5 text-center">To-do List</h1>
      <TodoForm onAddTodo={addTodo} isLoading={isLoading} />

      {isLoading && <Spinner />}

      {todosList.length === 0 && !isLoading && (
        <p className="text-center">No tasks, add a new one</p>
      )}

      {todosList.length > 0 && !isLoading && (
        <TodoList todos={todosList} onDelete={deleteTodo} />
      )}
    </div>
  );
}
