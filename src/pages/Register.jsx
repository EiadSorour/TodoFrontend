import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props){
    
    const navigate = useNavigate();

    const [userData, setUserData] = useState(
        {
            username: "",
            password: ""
        }
    );

    const [showWarning , setShowWarning] = useState(false);

    function handleOnChange(event){
        const target = event.target;
        setUserData((prev)=>{
            return (
                {
                    ...prev,
                    [target.name]: target.value
                }
            )
        });
    }

    async function handleOnClick(event){
        const buttonName = event.target.name;
            if(buttonName === "register"){
            const url = props.SERVER_API + "/register";
            const data = {username: userData.username , password: userData.password};
            const response = await axios.post(url, data, {headers: {'content-type': 'application/x-www-form-urlencoded'}});
            if(response.data === "exists"){
                setShowWarning(true);
            }else{
                navigate("/todos", {
                    state: {
                        username: userData.username,
                        userTodos: response.data.todos,
                        userID: response.data.userID
                    }
                });
            }
        }else{
            navigate("/home");
        }
    }

    return (

        <div className="main position-relative">
            <div className="position-absolute top-50 start-50 translate-middle login-form">
                <h1 className="display-5 fw-bold text-body-emphasis mb-3">Register</h1>

                <div className="form-floating mb-3 width-control ">
                    <input onChange={handleOnChange} name="username" type="text" className="form-control" id="floatingInput" placeholder="Username"/>
                    <label for="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3 width-control">
                    <input onChange={handleOnChange} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                {showWarning ? <p style={ {color: "red"}}>This user already exists, please log in</p> : <></>}
                <button className="btn btn-primary btn-lg px-4 mx-5" onClick={handleOnClick} name="register">Register</button>
                <button className="btn btn-outline-secondary btn-lg px-4 mx-5 " onClick={handleOnClick} name="home">Home page</button>
            </div>
        </div>
    )
}

export default Register;