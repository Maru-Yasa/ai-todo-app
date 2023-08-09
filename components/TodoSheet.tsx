'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { updateObjectByUUID } from "@/lib/utils"

interface TodoSheetProps {
    data?: Todo,
    checkedCallback: () => void
}

const Todo = ({ data, handleChecked }: { data: Todos, handleChecked: (todo: string, value: any) => void }) => {
    const [isComplete, setIsComplete] = useState<CheckedState>(data.status == "complete")
    
    return (
        <div className="flex items-center justify-between border rounded-lg p-4">
            <h2>{data.todo}</h2>
            <Checkbox checked={isComplete} onCheckedChange={(e) => {handleChecked(data.todo, e); setIsComplete(!isComplete)}} id={`${data.todo}`} />
        </div>
    )
}

export const TodoSheet = ({ data, checkedCallback }: TodoSheetProps) => {



    const handleChecked = (todo: string, value: any) => {
        let dataPointer: Todos = data?.todos?.filter((e) => e.todo === todo)[0] as unknown as Todos

        if (value) {
            dataPointer.status = "complete"
        } else {
            dataPointer.status = "todo"
        }

        let _todos = data?.todos?.filter((e) => e.todo != dataPointer.todo)
        _todos?.push(dataPointer)


        updateObjectByUUID("_todo", data?.uuid as string, {
            ...data,
            todos: _todos
        })

    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" onClick={checkedCallback}>See Detail</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} className="w-full h-[500px] md:px-24 py-10 overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{data?.title}</SheetTitle>
                    <SheetDescription>
                        {data?.description}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-3 px-3 space-y-3">
                    {data?.todos?.map((t, index) => {
                        return <Todo key={index} handleChecked={handleChecked} data={t} />
                    })}
                </div>

            </SheetContent>
        </Sheet>
    )
}