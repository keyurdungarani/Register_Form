// import { faEnvelope } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';

library.add(fas)

const Students = () => {
    const loginMail = localStorage.getItem('loginMail')

    const params = useParams()
    console.log("🤡 ~ file: Students.js:24 ~ Students ~ data:", params?.email);

    const Navigate = useNavigate("")
    const userData = JSON.parse(localStorage.getItem("userData") || "[]");

    const handleLogout = () => {
        localStorage.removeItem("loggedin")
        toast.success("Logged Out successfully")
        Navigate("/signup")
    }
    const [fullName, setFullName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [gender, setGender] = useState('');
    const [dark, setDark] = useState(false);
    const [operation, setOperation] = useState('');
    const [showHide, setShowHide] = useState(false);

    const allStudentData = JSON.parse(localStorage.getItem('studentsData') || "[]");
    const studentsData = allStudentData?.filter((student) => student?.email === params?.email)

    // console.log("🤡 ~ file: Students.js:30 ~ Students ~ localStorage:", localStorage);
    const handleResetForm = () => {
        setFullName('')
        setRollNo('')
    }
    const showhideFun = () => loginMail === params?.email ? setShowHide(true) : setShowHide(false);
    // (() => loginMail === params?.email ? setShowHide(true) : setShowHide(false))()
    const handleChanges = (sr) => {
        console.log("sr", sr)
        const editData = studentsData.filter((data) => data.rollNo === sr);
        // setEmail(editData[0].email)
        setEmail(editData[0].email)
        setFullName(editData[0].fullName)
        setRollNo(editData[0].rollNo)
        // setGender(editData[0].gender)
        // setPassword(editData[0].password)
    }
    const isRollValid = studentsData.some(function (data) {
        return data.rollNo === rollNo;
    });
    // console.log("🤡 ~ file: Students.js:65 ~ Students ~ isRollValid:", isRollValid);
    const submitChanges = () => {

        const dataToEdit = { "fullName": fullName, "rollNo": rollNo, "email": loginMail }
        if (operation === 'edit') {
            const curData = JSON.parse(localStorage.getItem('studentsData'))

            const updatedData = curData?.map((d) => {
                { console.log("🤡 ~ file: Students.js:65 ~ updatedData ~ d:", d) }
                if (d?.rollNo === rollNo && d?.email === loginMail) {
                    return ({
                        ...d,
                        fullName
                    })
                } else {
                    return d
                }
            })
            localStorage.setItem('studentsData', JSON.stringify(updatedData))
            document.getElementById('edit').click()
            handleResetForm()
            Navigate(`/students/${params?.email}`)
            toast.success("Edited Successfully")
            // localStorage.setItem('userData', JSON.stringify(updatedData))

        } else if (operation === 'add') {
            if (isRollValid === true) alert("Roll No. already exists")
            if (isRollValid === false && rollNo && fullName) {

                const finalData = JSON.parse(localStorage.getItem("studentsData") || "[]")

                const dataToEdit = { "fullName": fullName, "rollNo": rollNo, "email": loginMail }

                finalData.push(dataToEdit)
                localStorage.setItem("studentsData", JSON.stringify(finalData))
                document.getElementById('close').click()
                Navigate(`/students/${params?.email}`)
            }
        }
    }
    const handleDelete = (dr) => {
        if (window.confirm("Are you sure?")) {
            const wantToDelete = studentsData.filter((ud) => dr !== ud.rollNo)

            console.log("🤡 ~ file: Students.js:66 ~ handleDelete ~ dr:", dr);
            console.log("🤡 ~ file: Data.js:58 ~ wantToDelete ~ wantToDelete:", wantToDelete);

            localStorage.setItem('studentsData', JSON.stringify(wantToDelete))
            Navigate(`/students/${params?.email}`)
            toast.success('Successfully Deleted')
        }
    }

    useEffect(() => {
        showhideFun()
    }, [])

    return (
        <>
            <h1 className='container text-center'>Students Data <button className='btn btn-primary float-end my-2' onClick={handleLogout}>Logout</button> <button className='btn btn-primary float-end my-2 mx-2' onClick={() => setDark((prev) => !prev)}>{`${dark ? 'Light' : 'Dark'} Mode`}</button>
            </h1>
            <div className='container'>
                <hr></hr>
                <button type="button" disabled={loginMail !== params.email} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => {
                        handleResetForm()
                        setOperation('add')
                    }}
                >
                    Add Students data <FontAwesomeIcon className='mouseEvents' icon="fa-solid fa-plus" />
                </button>
                <button className='btn btn-primary float-end' onClick={() => Navigate('/data')}>Back</button>
                <table className={`table table-${dark ? 'dark' : 'light'} my-3`}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Roll No.</th>
                            {showHide === true && <th>Edit</th>}
                            {showHide === true && <th>Delete</th>}
                        </tr>
                    </thead>
                    {studentsData.map((data) => <>
                        <thead>
                            <tr>
                                <th>{data.fullName}</th>
                                <th>{data.rollNo}</th>
                                {showHide && <th>
                                    <button disabled={loginMail !== params?.email} type="button" id='edit' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={
                                        () => { setOperation('edit'); handleChanges(data.rollNo) }
                                    }>
                                        <FontAwesomeIcon className='mouseEvents' icon="fa-solid fa-plus" />
                                    </button>
                                </th>}
                                {showHide && <th>
                                    <FontAwesomeIcon className='mouseEvents' onClick={() => handleDelete(data.rollNo)} icon="fa-solid fa-trash" />
                                </th>}
                            </tr>
                        </thead>
                    </>)}

                    {/* {userData.map((data) => <>
                        <thead>
                            <tr>
                                <th>{`${data.fname} ${data.lname}`}</th>
                                <th>{data.email}</th>
                                <th>{data.gender}</th>
                                <th>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <FontAwesomeIcon className='mouseEvents' onClick={() => handleChanges(data.email)} icon={"fa-pen-to-square"} />
                                    </button>
                                </th>
                                <th>
                                    <FontAwesomeIcon className='mouseEvents' onClick={() => handleDelete(data.email)} icon="fa-solid fa-trash" />
                                </th>
                                <th>
                                    <FontAwesomeIcon className='mouseEvents' icon="fa-solid fa-plus" />
                                </th>
                            </tr>
                        </thead>
                    </>)} */}
                </table>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form>
                                    <div className="container mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={'Full Name'} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="container mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Roll No.</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Last Name" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='close' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-submit" onClick={submitChanges}>Save changes</button>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Students