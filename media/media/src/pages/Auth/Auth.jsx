import React, { useState } from "react";
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthActions";

function Auth() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(true)

    const [data, setData] = useState(
        {
            firstname: "", 
            lastname:"", 
            password: "",
            confirmpass:"",
            username:""
         }
    );

    const [confirmpass, setConfirmpass] = useState(true)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
          data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmpass(false)
        }
        else{
            dispatch(logIn(data))
        }
    }

    const resetForm = () => {
        setConfirmpass(true)
        setData({
            firstname: "", 
            lastname:"", 
            password: "",
            confirmpass:"",
            username:""
        })
    }

    return (
        <div className="auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="webName">
                    <h1>Hồ sơ cá nhân</h1>
                    <h6>Khám phá điều thú vị xung quanh ta</h6>
                </div>
            </div>


            
            {/* right side */}
            <div className="a-right">
            <form  className="infoForm authForm" onSubmit={handleSubmit}>
                <h3>{isSignUp ? "Đăng ký" : "Đăng nhập"}</h3>

                {isSignUp && (
                    <div>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            className="infoInput" 
                            name='firstname'
                            onChange={handleChange}
                            value={data.firstname}
                        />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            className="infoInput" 
                            name='lastname'
                            onChange={handleChange}
                            value={data.lastname}
                        />                    
                    </div>
                )}
                

                <div>
                    <input 
                        type="text" 
                        placeholder="User name" 
                        className="infoInput" 
                        name="username"
                        onChange={handleChange}
                        value={data.username}
                    />
                </div>

                <div>
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="infoInput" 
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                    />

                    {isSignUp && (
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="infoInput" 
                            name="confirmpass"
                            onChange={handleChange}
                            value={data.confirmpass}
                        />
                    )}
                </div>
                <span style={{
                        display: confirmpass? "none" : "block", 
                        color:"red", 
                        fontSize:"12px", 
                        alignSelf: "flex-end",
                        marginRight:"12px"
                    }}>
                    Mật khẩu không trùng khớp
                </span>
                <div>
                    <span 
                        style={{fontSize:'12px', cursor: "pointer"}} 
                        onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}
                    >
                        {isSignUp ? "Bạn đã tạo tài khoản? Đăng nhập" : "Bạn chưa có tài khoản? Đăng ký"}
                    </span>
                </div>

                <button 
                    className="button infoButton" 
                    type="submit"
                    disabled = {loading}
                >
                    {loading ? "Đang tải..." : isSignUp ? "Đăng ký" : "Đăng nhập"}
                </button>
            </form>
        </div>

        </div>
    );
}

export default Auth;