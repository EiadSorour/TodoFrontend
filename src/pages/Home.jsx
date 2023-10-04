import React from "react";

function Home(props){
    return (

        <div className="px-4 py-5 text-center main position-relative">
            <div className="position-absolute top-50 start-50 translate-middle">
            <h1 className="display-5 fw-bold text-body-emphasis">Welcome</h1>
            <div className=" mx-auto">
                <p className="lead mb-4">Please login/register to use our app</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <a href={props.REACT_PORT + "/login"}>
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3" fdprocessedid="pztece">Login</button>
                    </a>
                    <a href={props.REACT_PORT + "/register"}>
                        <button type="button" className="btn btn-outline-secondary btn-lg px-4" fdprocessedid="81tkel">Register</button>
                    </a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home;