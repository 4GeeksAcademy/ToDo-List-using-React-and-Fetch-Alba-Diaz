import React, { useEffect, useState } from "react";


export const TodoList = () => {
    const [task, setTask] = useState('')
    const [list, setList] = useState([])


    const createUser = () => {
        //POST
        fetch('https://playground.4geeks.com/todo/users/alba_diaz_lopez', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
                return resp.json()
            })
            .then(list => getUserTodos())
            .catch(err => console.log(err))
    }

    const getUsersTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/alba_diaz_lopez')
            .then(resp => {
                if (resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json()
            })
            .then(list => setList(list))
            .catch(err => createUser())
    }


    const createTask = () => {

        fetch('https://playground.4geeks.com/todo/todos/alba_diaz_lopez', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ label: task, is_done: false })

        }
        )
            .then(resp => {
                if (!resp.ok) throw new Error(`error status code : ${resp.status}`)
                return resp.json()
            })
            .then(list => getUsersTodos())
            .catch(err => console.log(err))


    }

    const handleDelete = id => {
        fetch('https://playground.4geeks.com/todo/todos/' + id, {
            method: "DELETE",
        }
        )
            .then(resp => {
                getUsersTodos()
            })
            .catch(err => console.log(err))


    }

    useEffect(() => {

        getUsersTodos()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        createTask()
        setTask('')
    }
    return (
        <div className="todoListContainer container">
            <ul className="list-group">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex list-group-item border-bottom-0">
                        <input type="text" value={task} onChange={e => setTask(e.target.value)} className="w-100" />
                        <input type="submit" value="add" />
                    </div>
                </form>
                <div>

                {list.length > 0 ? list.todos?.map((el, i) => <li key={i} className="list-group-item d-flex justify-content-between" >
                    {el.label} <i className="fa-regular fa-square-minus fs-5 text-danger" onClick={() => handleDelete(el.id)} ></i> </li>) : <li className="list-group-item border-top-0"> Todo List empty. Add a new task</li>}
                <li className="list-group-item border-top-0">  {list.length} {list.length === 1 ? "task" : "tasks"} </li>
                
                </div>
            </ul>
        </div>
    );
}
