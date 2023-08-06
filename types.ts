interface Todos {

}

interface Todo {
    uuid: string,
    title: string,
    todos: Array<Todos>
}