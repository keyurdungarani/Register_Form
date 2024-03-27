import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const StudentProtectRouter = () => {
    const Navigate = useNavigate("");
    const loginStatus = localStorage.getItem("loggedin");

    useEffect(() => {
        if (!loginStatus) {
            Navigate("login")
        }
    }, [loginStatus]);
    return (
        <>
            <Outlet />
            {/* <footer className='container text-center'>
                <div>
                    <h1>Footer</h1>
                </div>
            </footer> */}
        </>
    )
}

export default StudentProtectRouter