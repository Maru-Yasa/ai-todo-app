'use client'

import { CheckCircledIcon, DotsVerticalIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TodoSheet } from "./TodoSheet"


interface TodoCardProps {
    data?: Todo,
    deleteCallback?: () => void,
    editCallback: () => void,    
}

export const TodoCard = ({ data, deleteCallback, editCallback }: TodoCardProps) => {
    return (
        <div className="border rounded-lg p-4">
            <div className="flex justify-between gap-x-2">
                <h2 className='text-xl font-medium text-ellipsis line-clamp-2 h-14'>{data?.title}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <DotsVerticalIcon className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={deleteCallback} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-1">
                <p className="text-sm font-light text-gray-700 dark:text-white h-16 line-clamp-3 text-ellipsis">{data?.description}</p>
            </div>
            <div className="flex justify-between mt-3">
                <div className="flex items-center gap-1 font-medium text-xs text-orange-500">
                    <InfoCircledIcon />
                    <span>Todo : {data?.todos?.filter((e) => e.status == 'todo').length}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-xs text-green-500">
                    <CheckCircledIcon />
                    <span>Complete : {data?.todos?.filter((e) => e.status == 'complete').length}</span>
                </div>
            </div>
            <div className="mt-4">
                <TodoSheet data={data} checkedCallback={editCallback} />
            </div>
        </div>
    )
}