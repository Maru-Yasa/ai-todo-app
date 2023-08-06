interface Todos {
    todo: string,
    status: string
}

interface Todo {
    uuid: string,
    title: string,
    description?: string,
    todos?: Array<Todos>
}

interface InputState {
    isLoading?: boolean,
    isEmpty?: boolean
}