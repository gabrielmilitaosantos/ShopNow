import React from "react";
import Button from '@mui/material/Button';

import './CSS/LoginSignUp.css';

function LoginSignUp() {
    return (
        <div className="login-signup">
            <div className="login-signup-container">
                <h1>Sign Up</h1>
                <div className="login-signup-fields">
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                </div>
                <Button variant="contained">Continue</Button>
                <p className="signup-login">
                    Already have a account? <span>Login here</span>
                </p>
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