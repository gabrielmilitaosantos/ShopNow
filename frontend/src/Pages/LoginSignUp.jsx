import React, { useState } from "react";
import Button from '@mui/material/Button';
import './CSS/LoginSignUp.css';

function LoginSignUp() {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const login = async () => {
        console.log("Função login", formData);
    }

    const signup = async () => {
        console.log("Função signup", formData);
    }

    return (
        <div className="login-signup">
            <div className="login-signup-container">
                <h1>{state}</h1>
                <div className="login-signup-fields">
                    {state === "Sign Up" && <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <Button variant="contained" onClick={() => { state === "Login" ? login() : signup() }}>Continue</Button>
                {state === "Sign Up" ?
                    <p className="signup-login">Already have a account? <span onClick={() => { setState("Login") }}>Login here</span></p>
                    :
                    <p className="signup-login">Create a account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
                }
                <div className="login-signup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use &
                        privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp;