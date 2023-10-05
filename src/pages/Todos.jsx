import React , {useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

function Todos(props){

    const navigate = useNavigate();
    const {state} = useLocation();
    const [todos , setTodos] = useState(state.userTodos);
    const [showBox , setShowBox] = useState(false);
    const [newTodo , setNewTodo] = useState("");

    async function handleOnClick(event){
        const target = event.target;
        const baseURL = props.SERVER_API;
        
        if(target.name === "deleteTodo"){
            const data = {params : { userID: state.userID , todoID: target.id }}
            const response = await axios.delete(baseURL + "/todos", data);
            setTodos(response.data);
        }

        else if(target.name === "updateTodo"){
            const data = { userID: state.userID , todoID: target.id }
            const response = await axios.patch(baseURL + "/todos", data , {headers: {'content-type': 'application/x-www-form-urlencoded'}});
            setTodos(response.data);
        }
        
        else if(target.name === "logout"){
            navigate("/home");
        }
        
        else if(target.name === "showBox"){
            setShowBox(true);
        }
        
        else if(target.name === "exitNewTodo"){
            setShowBox(false);
            setNewTodo("");
        }
        
        else if(target.name === "addNewTodo"){
            if(newTodo === ""){
                return;
            }
            const data = {userID: state.userID , text: newTodo};
            const response = await axios.post(baseURL + "/todos/new" , data , {headers: {'content-type': 'application/x-www-form-urlencoded'}} );
            setTodos(response.data);
            setNewTodo("");
        }
    }

    function handleOnChange(event){
        const value = event.target.value;
        setNewTodo(value);
    }

    return(
        <div className="main todo-screen mt-5">
            <h1 className="display-5 fw-bold text-body-emphasis mb-3">Welcome {state.username} !</h1>
            
            <ul className="list-group">
            {todos.map( (todo)=>{
                return (
                    <div>
                        <li key={todo._id} className="list-group-item position-relative">
                            <input onClick={handleOnClick} name="updateTodo" className="form-check-input me-1" type="checkbox" id={todo._id} checked={todo.isCompleted} />
                            <label className="form-check-label mx-2" htmlFor={todo._id} style={ todo.isCompleted ? {textDecoration: "line-through"} : {} }>{todo.text}</label>
                            <button onClick={handleOnClick} name="deleteTodo" id={todo._id} className="btn position-absolute top-50 end-0 translate-middle-y trash-icon fa-solid fa-trash-can" ></button>
                        </li>
                    </div>
                )
            } )}
            </ul>
            <br/><br/>

            <button onClick={handleOnClick} name="showBox" className="btn btn-primary mx-2">Add New Todo</button>
            <button onClick={handleOnClick} name="logout" className="btn btn-outline-secondary mx-2">Logout</button>
            {showBox?   <div>
                            <br/>
                            <input onChange={handleOnChange} className="form-control text-input-control d-inline " type="text" value={newTodo} aria-label="readonly input example" />
                            <button onClick={handleOnClick} name="addNewTodo" className="btn btn-outline-success btn-sm mx-2 py-2">Add</button>
                            <button onClick={handleOnClick} name="exitNewTodo" className="btn btn-outline-danger btn-sm py-2">Cancel</button>
                            <br/><br/><br/>
                        </div> : <br/>}
        </div>
    )
}

export default Todos;