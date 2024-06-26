import axios from "axios"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import cOne from '../../assets/carouselOne.png';
import cTwo from '../../assets/carouselTwo.png';
import lightLogo from '../../assets/lightLogo.png';
import darkLogo from '../../assets/darkLogo.png';

import './login.css'
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants";

// const baseURL = 'http://localhost:8090/api/login';
const loginAxios = axios.create({
    headers: {
        role: 'user',
    },
    baseURL: `${API_BASE_URL}/api/login`,
});



const Login = (props) => {

    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: '',
    });

    function onChangeHandler(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginCreds({
            ...loginCreds,
            [name]: value,
        });
    }

    function registerRouting() {
        navigate("/register");
    }

    function forgotPasswordRouter() {
        navigate("/forgotPassword");
    }

    //holding the token in memory

    // function onSubmitHandler() {
    //     //redirect to OTP verification at http://localhost:8090/api/2fa
    //     // setLogin(true);
    //     loginAxios.post('', {
    //         email: loginCreds.email,
    //         password: loginCreds.password,
    //     })
    //         .then((response) => {
    //             // console.log(response);
    //             if (response.data.success) {
    //                 props.loginEmail(loginCreds.email);
    //                 props.setLoginStatus(true);
    //                 setLogin(true);
    //                 // console.log("TFA");
    //             }
    //             else {
    //                 setLoginCreds({
    //                     email: '',
    //                     password: '',
    //                 })
    //                 setLogin(false);
    //                 // console.log("FAILED");
    //             }
    //             setLoginCreds({
    //                 email: '',
    //                 password: '',
    //             })
    //         })
    //         .catch((error) => {
    //             setLoginCreds({
    //                 email: '',
    //                 password: '',
    //             })
    //             console.log("FAILED");
    //             console.log(error);
    //         })
    //     // console.log(loginCreds);
    // }
    
    function onSubmitHandler() {
        const functionThatReturnPromise = () => {
            return loginAxios.post('', {
                email: loginCreds.email,
                password: loginCreds.password,
            })
                .then((response) => {
                    if (response.data.success) {
                        props.loginEmail(loginCreds.email);
                        props.setLoginStatus(true);
                        setLogin(true);
                        return response;
                    } else {
                        throw new Error("Invalid email or password.");
                    }
                });
        };

        toast.promise(
            functionThatReturnPromise,
            {
                pending: 'Logging in...',
                success: 'Login successful! Please Enter OTP to Access Dashboard',
                error: 'Login Failed ! Please check email or password and try again',
            }
        );
    }
    

    if (login) {
        return <Navigate to='tfauth' />
    }

    return (
        <>
            <div id="logo">
                <img src={lightLogo} width={"100%"} />
            </div>
            <div id="login--container">
                <div id="carousel--div">
                    <div id="image--holder">
                        <img src={cOne} width={"100%"} />
                    </div>
                    <div id="reg--button--div" className="button--holder">
                        <button id="register--routing--button" type="button" onClick={registerRouting}>Register</button>
                    </div>
                </div>
                <div id="dividing--line"></div>
                <div id="login--div">
                    <div className="login--divs" id="login--title">LOGIN</div>
                    <form className="login--divs" id="login--form">
                        {/* <label id="email--label" className="label" htmlFor="email-input">Email</label> */}
                        {/* <br /> */}
                        <input
                            id="email--input"
                            autoComplete="off"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginCreds.email}
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        {/* <br /> */}
                        {/* <label id="password--label" className="label" htmlFor="password-input">Password</label> */}
                        {/* <br /> */}
                        <input
                            id="password--input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginCreds.password}
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        <div id="forgot--password" onClick={forgotPasswordRouter}>FORGOT PASSWORD!</div>
                        {/* <br /> */}
                    </form>
                    <div className="login--divs button--holder" id="button--div">
                        <button id="login--button" type="button" onClick={onSubmitHandler}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login