'use client'

import { TodoCard } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteArrayObjectLocalStorage, generateUUID, parseResponseTodos, pushToLocalStorage } from '@/lib/utils'
import { QuestionMarkIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {

  const [input, setInput] = useState<string>("")
  const [todo, setTodo] = useState<Array<Todo>>((JSON.parse(localStorage.getItem("_todo") as string) || []))
  const [state, setState] = useState<InputState>({
    isEmpty: true,
    isLoading: false
  })

  useEffect(() => {
    if (todo.length >= 1) {
      setTodo((JSON.parse(localStorage.getItem("_todo") as string)).reverse())      
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
    setTodo((JSON.parse(localStorage.getItem("_todo") as string)).reverse())
  }, [todo])

  const handleGenerate = async () => {
    setState({ ...state, isLoading: true })
    const response = await (await fetch(`/api/todo?topic=${input}`)).json()
    setState({ ...state, isLoading: false })

    const data = response.data
    // TODO: proccess todo, split by '|' to create todos
    const _todo: Todo = {
      uuid: generateUUID(),
      title: `${data.emoji as string} ${input as string}`,
      description: data.description as string,
      todos: parseResponseTodos(data.todos)
    }
    pushToLocalStorage("_todo", _todo)
    setTodo((JSON.parse(localStorage.getItem("_todo") as string)).reverse())
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-7 md:10 lg:p-24">
      <div className="flex gap-3 max-w-lg w-full h-fit">
        <Input
          className='w-full'
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Make earth zero emmision`}
        />
        <Button
          disabled={state.isEmpty}
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
            return <TodoCard key={t.uuid} data={t} deleteCallback={() => handleDelete(t.uuid)} />
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
