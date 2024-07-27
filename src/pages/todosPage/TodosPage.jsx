import {useEffect, useState} from "react";
import {Todo} from "../../components/todo/Todo";


const URL = 'http://localhost:8000/todos'

function TodosPage () {

    const [todos,setTodos] = useState([])
    const [value, setValue] = useState('')

    async function getTodos () {
        const response = await fetch(URL);
        const data = await response.json()
        setTodos(data)
    }

    async function createTodo () {
        const newTodo = {
            title: value,
            status: false
        }
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })

        if(response.status === 201){
             getTodos()
            setValue('')
        }
    }

    async function deleteTodo(id) {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        })
        if(response.status === 200){
            getTodos()
        }
    }
    async function updateTodo (id, todo) {
        const newTitle = {
            title:value
        }
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTitle)
        })
        if(response.status === 200){
            getTodos()
        }
    }

    async function changeStatus (status, id) {
        const newStatus = {
            status: status
        }
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStatus)
        })

            getTodos()

    }

    useEffect(() => {
        getTodos()
    }, [])


    return (
        <div>
            <h2>Todo list</h2>
            <div>
                <input type="text"
                       placeholder="enter todo"
                       value={value}
                       onInput={(e) => setValue(e.target.value)}/>
                <button onClick={createTodo}>create todo</button>
            </div>
            {
                todos.map(todo => <Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    changeStatus={changeStatus}
                    updateTodo={updateTodo}
                />)
            }
        </div>
    )
}

export default TodosPage;