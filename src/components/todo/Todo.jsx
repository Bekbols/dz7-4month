


export function Todo ({todo, deleteTodo, changeStatus , updateTodo}) {

    function onInput(event) {
        console.log(event.target.checked)
        const {checked} = event.target;

        changeStatus(checked, todo.id);
    }

    return (
        <div className="todo">
            <input type="checkbox" onInput={onInput}/>
            <span className={todo.status && "checked"}>{todo.title}</span>
            <button onClick={()=> deleteTodo(todo.id)}>delete</button>
            <button onClick={()=> updateTodo(todo.id)}>update</button>
        </div>
    )
}
