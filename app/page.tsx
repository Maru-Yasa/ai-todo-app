'use client'

import { TodoCard } from '@/components/Card'
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { deleteArrayObjectLocalStorage, generateUUID, parseResponseTodos, pushToLocalStorage } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {

  const getTodo = () => typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("_todo") as string)).reverse() : []
  
  const { toast } = useToast()
  const [input, setInput] = useState<string>("")
  const [todo, setTodo] = useState<Array<Todo>>(getTodo())
  const [state, setState] = useState<InputState>({
    isEmpty: true,
    isLoading: false
  })


  useEffect(() => {
    console.log('====================================');
    console.log("Are you interesting how this web app works?");
    console.log("Github: https://github.com/maru-yasa/ai-todo-app");
    console.log('====================================');
    if (todo.length >= 1) {
      setTodo(getTodo())      
    }
  }, [])

  useEffect(() => {
    if (input.length >= 1) {
      setState({
        ...state,
        isEmpty: false,
      })
    } else {
      setState({
        ...state,
        isEmpty: true,
      })
    }
  }, [input])

  const handleDelete = useCallback((uuid: string) => {
    deleteArrayObjectLocalStorage("_todo", "uuid", [uuid])
    setTodo(getTodo())
  }, [todo])

  const handleEdit = useCallback(() => {
    console.log('====================================');
    console.log("✨ Data refreshed");
    console.log('====================================');
    setTodo(getTodo())
  }, [todo])

  const handleGenerate = async () => {

    if (state.isEmpty) {
      return;
    }

    setState({ ...state, isLoading: true })
    const response = await fetch(`/api/todo?topic=${input}`)
    setState({ ...state, isLoading: false })

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      return
    }

    const data = (await response.json()).data
    // TODO: proccess todo, split by '|' to create todos
    const _todo: Todo = {
      uuid: generateUUID(),
      title: `${data.emoji as string} ${input as string}`,
      description: data.description as string,
      todos: parseResponseTodos(data.todos)
    }
    pushToLocalStorage("_todo", _todo)
    setTodo(getTodo())
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-7 md:10 lg:p-24">
      <div className="flex flex-col md:flex-row gap-3 max-w-2xl w-full h-fit">
        <div className="flex gap-3 w-full">
          <ModeToggle />
          <Input
            className='w-full'
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Make earth zero emission`}
          />
        </div>
        <Button
          onClick={handleGenerate}
        >
          {state.isLoading && <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Generating
          </>}
          {!state.isLoading && <>
            Generate
          </>}
        </Button>
      </div>
      <div className="max-w-4xl w-full">
        <div className="w-full grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {todo.map((t) => {
            return <TodoCard editCallback={handleEdit} key={t.uuid} data={t} deleteCallback={() => handleDelete(t.uuid)} />
          })}


        </div>
          {todo.length < 1 && <>
            <div className="text-center">
              <h2>No todos yet</h2>
            </div>
          </>}
      </div>
    </main>
  )
}
