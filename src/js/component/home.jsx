import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//create your first component
const Home = () => {
    const [task, setTask] = useState("")
    const [todos, setTodos] = useState([])
    const apiUrl="https://assets.breatheco.de/apis/fake/todos/user/SantiagoMendez"
    useEffect(() => {
        // fetch(apiUrl, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify([]),
        // })
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            setTodos(data);
        })
        .catch((error)=>console.log(error))
    }, []);
    function addTodo(e){
if (e.code=="Enter"){
    //Aqui va la logica de agregar
    let newItem={label:task, done: false};
    let newTodos=[...todos, newItem];
    setTodos(newTodos);
    setTask("")
    fetch (apiUrl, {
        method: "PUT", body: JSON.stringify(newTodos),
        headers: {
            "Content-Type": "application/json",
        },
    })
}
}
function deleteTodo(index){
let newTodos=[...todos]
newTodos.splice(index,1)
setTodos(newTodos)
fetch (apiUrl, {
    method: "PUT", body: JSON.stringify(newTodos),
    headers: {
        "Content-Type": "application/json",
    },})
}
function checkTodo(index){
    let newTodos=[...todos]
    newTodos[index].done=!newTodos[index].done
    setTodos(newTodos)
fetch (apiUrl, {
    method: "PUT", body: JSON.stringify(newTodos),
    headers: {
        "Content-Type": "application/json",
    },})
}
    return (
        <>
        <div className="card" >
  <div className="card-header">
    <input
    type="text"
    className="form-control border-0"
    placeholder="escriba una tarea"
    value={task}
    onChange={(e)=> setTask(e.target.value)}
    onKeyDown={addTodo}
    />
  </div>
  <ul className="list-group">
    {todos.map((todo, index)=>(
  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
    <div className="form-check">
      <input className="form-check-input " type="checkbox" value="" id="miCheck" checked={todo.done} onChange={()=>checkTodo(index)}/>
        <label className="form-check-label" htmlFor="miCheck">
        </label>
    </div>
    {todo.label}
    <button onClick={()=>deleteTodo(index)} className="btn btn-outline-danger btn-sm rounded-pill">X</button>
  </li>
    ))}
  </ul>
  <div className="card-footer">
    {todos.length} Pendientes
  </div>
</div>
</>
    );
};
export default Home;
