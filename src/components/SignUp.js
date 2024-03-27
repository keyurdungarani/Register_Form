import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confPass: '',
        gender: ''
    })
    const [show, setShow] = useState(false);
    const [tick, setTick] = useState(false);
    const Navigate = useNavigate("");

    // setError({})
    console.log("🤡 ~ file: SignUp.js:29 ~ SignUp ~ error:", error);

    const validateEmail = (email) => {
        return email.match(


            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const validatePass = (password) => {
        const passErr = [];
        if (!password.match(/[A-Z]/)) passErr.push(" containe atleaset one UpperCase")
        if (!password.match(/[0-9]/)) passErr.push(" containe atleast one Number")
        return passErr;
    }
    // const genderSelect = (gender) => {
    //     if(!gender){
    //         setError((prev))
    //     }
    // }
    const isEmailValid = validateEmail(email)
    console.log("🤡 ~ file: SignUp.js:31 ~ SignUp ~ isEmailValid:", isEmailValid);

    const isPassValid = validatePass(password)

    console.log("🤡 ~ file: SignUp.js:32 ~ SignUp ~ isPassValid:", isPassValid);
    const handleSubmit = (e) => {
        setError({})
        e.preventDefault()

        if (!isEmailValid) setError((prev) => ({ ...prev, email: "Please enter valid email" }))
        if (!email.trim()) setError((prev) => ({ ...prev, email: "Email is required" }))
        if (isPassValid.length) setError((prev) => ({ ...prev, password: `Password should be${isPassValid.join(' & ')}` }))
        if (!password.trim()) setError((prev) => ({ ...prev, password: "Password is required" }))
        // if (!email.trim()) setError({ email: "Email can't be null" })
        // if (!password.trim()) setError({ password: "password can't be null" })
        if (!fname.trim()) setError((prev) => ({ ...prev, fname: "Required" }))
        if (!lname.trim()) setError((prev) => ({ ...prev, lname: "Required" }))
        // if (!tick) setError((prev) => ({ ...prev, tick: "Select the gender" }))
        if (!gender || gender === "Select Gender") setError((prev) => ({ ...prev, gender: "Select the gender" }))
        if (password !== confPass) setError((prev) => ({ ...prev, confPass: "Password should be matched" }))
        if (fname && lname && gender && isEmailValid && isPassValid.length === 0 && password === confPass && tick === false) {
            toast.error("Please accept the terms and conditions");
        }

        if (isEmailValid && isPassValid.length === 0 && password === confPass && gender && tick === true) {
            const userData = JSON.parse(localStorage.getItem("userData") || "[]")
            const data = { "fname": fname, "lname": lname, "gender": gender, "email": email, "password": password }
            userData.push(data);
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log(email, password);
            Navigate("/login")
            toast.success('Successfully Registered!', { style: { border: '1px solid #713200', padding: '16px', color: '#713200', } })
        }
    }
    return (
        <>
            <div className='container'>
                <h1 className='container text-center'>SignUp Page</h1>
                {/* <form> */}
                <div className="container mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                    {error.fname && <p className='text-danger'>{error.fname}</p>}
                    {/* {console.log(error.fname)} */}
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                    {error.lname && <p className='text-danger'>{error.lname}</p>}
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" placeholder="abc@gmail.com" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </div>
                <div className='container'>
                    <select className="form-select" onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                        <option defaultValue={"Select Gender"}>Slelect Gender</option>
                        <option value="Male" >Male</option>
                        <option value="Female" >Female</option>
                        <option value="Other" >Other</option>
                    </select>
                    {error.gender && <p className='text-danger'>{error.gender}</p>}
                </div>
                {gender}
                <div className="container mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type={show ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Pass@123" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* {isPassValid.length ? <p className='text-danger'>{`Password should be${isPassValid.join(' & ')}`}</p> : null} */}
                    <button className='btn btn-secondary' onClick={() => setShow((prev) => (!prev))}>{show ? "hide" : "show"}</button>
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={confPass} onChange={(e) => { setConfPass(e.target.value) }} />
                    {confPass}
                    {error.confPass && <p className='text-danger'>{error.confPass}</p>}
                </div>
                <div className="container mb-3 form-check">
                    <input type="checkbox" className="form-check-input" onChange={(e) => setTick(e.target.checked)} id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1" >Terms and Conditions</label>
                    {/* {tick?.toString()} */}
                    {/* {console.log(tick)} */}
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                {/* </form> */}
                <button className="btn btn-primary mx-2" onClick={() => Navigate("/login")}>Login</button>
                <Toaster />
            </div>
        </>
    )

}

export default SignUp