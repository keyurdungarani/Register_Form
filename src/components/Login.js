import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const Navigate = useNavigate("");
    const userData = JSON.parse(localStorage.getItem("userData") || "[]")

    const isEmailMatch = userData.some(function (data) {
        return data.email === email
    });
    const isPassMatch = userData.some(function (data) {
        return data.password === password;
    })
    const handleLogin = () => {
        setError({})
        console.log("isEmailMatch", isEmailMatch)

        console.log("isPassMatch", isPassMatch)

        if (!isEmailMatch) setError((prev) => ({ ...prev, email: "email is not exist" }))
        if (isPassMatch === false) setError((prev) => ({ ...prev, password: "wrong password" }))

        if (email && password && isEmailMatch && isPassMatch) {
            localStorage.setItem("loggedin", true)
            localStorage.setItem("loginMail", email)
            toast.success("Successfully Loggedin!")
            Navigate("/data")
        }
    }
    return (
        <>
            <h1 className="container mb-3 text-center">Login</h1>
            <div>
                <div className="container mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" placeholder="abc@gmail.com" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type={show ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Pass@123" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* {isPassValid.length ? <p className='text-danger'>{`Password should be${isPassValid.join(' & ')}`}</p> : null} */}
                    <button className='btn btn-secondary' onClick={() => setShow((prev) => (!prev))}>{show ? "hide" : "show"}</button>
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </div>
                <div className='container'>
                    <button className='btn btn-primary' onClick={handleLogin}>Login</button>
                    <button className='btn btn-primary mx-2' onClick={() => Navigate("/signup")}>SignUp</button>
                    <Toaster />
                </div>
            </div>
        </>
    )
}

export default Login