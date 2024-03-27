import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicRouter = () => {
    const Navigate = useNavigate("")
    const loginStatus = localStorage.getItem("loggedin")

    useEffect(() => {
        if (loginStatus) {
            Navigate("/data")
        }
    }, [loginStatus])
    return (
        <>
            {/* <div>PublicRouter</div> */}
            <div>
                <Outlet />
            </div>
        </>

    )
}

export default PublicRouter