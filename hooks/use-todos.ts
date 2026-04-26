import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todosService } from '@/services/todos.service'

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
}

export function useTodos() {
  return useQuery({ queryKey: todoKeys.lists(), queryFn: todosService.getAll })
}

export function useCreateTodo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (title: string) => todosService.create(title),
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.lists() }),
  })
}