import React, { useEffect, useState } from "react";


export const TodoList = () => {
    const [task, setTask] = useState('')
    const [list, setList] = useState([])
    const [hoverTaskId, setHoverTaskId] = useState(null)


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
                if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json()
            })
            .then(list => setList(list.todos))
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
        <div className="todoListContainer-css container">
            <ul className="list-group  ">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex list-group-item border-0 form-bg-css">
                        <input type="text" value={task} onChange={e => setTask(e.target.value)} className=" form-bg-css placeholder-icon w-100  border-0 fs-4 ps-4 mx-4" placeholder=" type here " />
                        <input type="submit" value="add" hidden />
                    </div>
                </form>
                <div>

                    {list.length > 0 ? list.map((el, i) => <li key={i} className="list-group-item d-flex justify-content-between ps-5 border-0 list-bg-css font-css" onMouseEnter={() => setHoverTaskId(el.id)} onMouseLeave={() => setHoverTaskId(null)} >
                        - {el.label} {hoverTaskId == el.id && (<i className="fa-regular fa-square-minus fs-3 font-css delete-btn-css" onClick={() => handleDelete(el.id)} > </i>)} </li>) :

                        <li className="list-group-item border-0 ps-5 font-css"> Todo List empty. Add a new task! </li>}

                    <li className="list-group-item border-0 form-bg-css font-css">  {list.length} {list.length === 1 ? "task" : "tasks"} </li>



                </div>
            </ul>
        </div>
    );
}
