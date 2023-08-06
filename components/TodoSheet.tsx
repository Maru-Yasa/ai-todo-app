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

interface TodoSheet {
    data?: Todo
}

const Todo = ({ data }: { data: Todos }) => {
    return (
        <div className="flex items-center justify-between border rounded-lg p-4">
            <h2>{data.todo}</h2>
            <Checkbox id={`${data.todo}`} />
        </div>
    )
}

export const TodoSheet = ({ data }: TodoSheet) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">See Detail</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} className="w-full h-[500px] md:px-24 py-10 overflow-scroll">
                <SheetHeader>
                    <SheetTitle>{data?.title}</SheetTitle>
                    <SheetDescription>
                        {data?.description}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-3 px-3 space-y-3">
                    {data?.todos?.map((t, index) => {
                        return <Todo key={index} data={t} />
                    })}
                </div>

            </SheetContent>
        </Sheet>
    )
}