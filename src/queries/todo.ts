import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { createTodo, deleteTodo, getTodos, updateTodo } from 'api'
import { Todo } from 'types'
import { queryClient } from 'queryClient'

const todosQueryOption = {
  queryKey: ['todos'] as const,
  queryFn: getTodos,
} satisfies UseQueryOptions

export const useTodosQuery = () => useQuery(todosQueryOption)

export const useTodosCount = () =>
  useQuery({
    ...todosQueryOption,
    select: data => data.length,
  })

export const useTodoQuery = (id: string) =>
  useQuery({
    ...todosQueryOption,
    select: data => data.find(todo => todo.id === id),
  })

export const useCreateTodoMutation = () =>
  useMutation(createTodo, {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  })

export const useUpdateTodoMutation = () =>
  useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  })

export const useDeleteTodoMutation = () =>
  useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  })
