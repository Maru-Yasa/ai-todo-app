import { DotsVerticalIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

interface TodoCardProps {
    data?: Todo
}

export const TodoCard = ({  }: TodoCardProps) => {
    return (
    <div className="border rounded-lg p-4">
        <div className="flex justify-between">
          <h2 className='text-xl font-medium text-ellipsis line-clamp-2'>Make Earch zero emmision</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <DotsVerticalIcon className="cursor-pointer" />              
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-1 font-medium text-xs text-orange-500">
            <InfoCircledIcon />
            <span>Todo : 5</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-xs text-green-500">
            <InfoCircledIcon />
            <span>Complete : 7</span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant={'outline'}>See Detail</Button>
        </div>
    </div>
    )
}