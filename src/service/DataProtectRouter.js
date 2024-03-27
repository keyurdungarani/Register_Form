import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const DataProtectRouter = () => {
    const Navigate = useNavigate("");
    const loginStatus = localStorage.getItem("loggedin")
    console.log(loginStatus)

    useEffect(() => {
        if (loginStatus) {
            Navigate("/data")
        } else {
            Navigate("/login")
        }
    }, [loginStatus])

    return (
        <>
            {/* <div>DataProtectRouter</div> */}
            <div>
                <Outlet />
                <footer className='container text-center'>
                    <div>
                        <h1>Footer</h1>
                    </div>
                </footer>
            </div>
        </>
    )

}

export default DataProtectRouter