import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props){
    
    const navigate = useNavigate();

    const [userData, setUserData] = useState(
        {
            username: "",
            password: ""
        }
    );

    const [showWarning, setShowWarning] = useState(false);

    function handleOnChange(event){
        const target = event.target;
        setUserData( (prev)=>{
            return (
                {
                    ...prev,
                    [target.name] : target.value
                }
            )
        } );
    }

    async function handleOnClick(event){
        const targetName = event.target.name;
        if(targetName === "login"){
            const url = props.SERVER_API + "/login";
            const data = {username: userData.username , password: userData.password};
            const response = await axios.post(url, data , {headers: {'content-type': 'application/x-www-form-urlencoded'}});
            if(response.data === "error"){
                setShowWarning(true);
            }else{
                navigate("/todos" , {
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
                <h1 className="display-5 fw-bold text-body-emphasis mb-3">Login</h1>

                <div className="form-floating mb-3 width-control ">
                    <input onChange={handleOnChange} name="username" type="text" className="form-control" id="floatingInput" placeholder="Username"/>
                    <label for="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3 width-control">
                    <input onChange={handleOnChange} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                {showWarning? <p style={{color: "red"}}>Incorrect username or password</p> : <></>}
                <button className="btn btn-primary btn-lg px-4 mx-5" onClick={handleOnClick} name="login">Login</button>
                <button className="btn btn-outline-secondary btn-lg px-4 mx-5 " onClick={handleOnClick} name="home">Home page</button>
            </div>
        </div>
    )
}

export default Login;