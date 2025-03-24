import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addTodoApi, deleteTodoApi } from '@/app/api/todos';
import { generateTempId } from '@/lib/helpers';
import { Todo } from '@/lib/types';

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: addTodoApi,
    onMutate: async (newTodoTitle) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      const tempId = generateTempId();
      const optimisticTodo = {
        id: tempId,
        title: newTodoTitle,
        completed: false,
      };

      queryClient.setQueryData(['todos'], [optimisticTodo, ...previousTodos]);
      return { previousTodos, tempId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) => {
        if (!oldTodos) return [];
        return oldTodos.map((todo) =>
          todo.id.toString() === context?.tempId
            ? { ...data, id: generateTempId() }
            : todo,
        );
      });
      toast.success('Task added successfully!');
    },
    onError: (err, newTodoTitle, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
      toast.error('Failed to add task!');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoApi,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      const updatedTodos = previousTodos.filter((todo) => todo.id !== id);

      queryClient.setQueryData(['todos'], updatedTodos);
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
      toast.error('Failed to delete task!');
    },
  });

  return {
    addTodoMutation,
    deleteTodoMutation,
  };
};
