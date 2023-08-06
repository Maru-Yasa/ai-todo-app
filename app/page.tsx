import { TodoCard } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <div className="flex gap-3 max-w-lg w-full h-fit">
        <Input 
          className='w-full'
          placeholder={`Make earth zero emmision`}
        />
        <Button>Generate</Button>
      </div>
      <div className="max-w-4xl w-full">
        <div className="w-full grid grid-cols-3 gap-5">

        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />

        </div>
      </div>
    </main>
  )
}
