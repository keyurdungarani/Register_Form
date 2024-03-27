// import { faEnvelope } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faL, fas } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';

library.add(fas)

const Data = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "[]");

    const handleLogout = () => {
        localStorage.removeItem("loggedin")
        toast.success("Logout Successfully!")
        Navigate("/signup")
    }
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dark, setDark] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loader, setLoader] = useState(false);
    const Navigate = useNavigate("")

    const params = useParams();

    const handleChanges = (eid) => {
        console.log("id", eid)
        const editData = userData.filter((data) => data.email === eid);

        console.log("🤡 ~ file: Data.js:35 ~ handleChanges ~ editData:", editData);

        setEmail(editData[0].email)
        setFname(editData[0].fname)
        setLname(editData[0].lname)
        setGender(editData[0].gender)
        setPassword(editData[0].password)
    }
    const submitChanges = () => {
        const dataToEdit = { "fname": fname, "lname": lname, "gender": gender, "email": email, "password": password }

        const curData = JSON.parse(localStorage.getItem('userData'))

        const updatedData = curData?.map((d) => {

            if (d?.email === dataToEdit?.email) {
                return ({ ...d, ...dataToEdit })
            }
            // console.log("🤡 ~ file: Data.js:42 ~ updatedData ~ ...d, ...dataToEdit:", { ...d }, { ...dataToEdit });
            return d
        })

        localStorage.setItem('userData', JSON.stringify(updatedData))
        document.getElementById('close').click()
        Navigate("/data")
        toast.success("Successfully! updated")
    }
    useEffect(() => {
        setLoader(true)
        if (userData) {
            setSearchResults(userData)
            setLoader(false)
        }
    }, [])

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        setSearchResults([])
        setLoader(true)
        setTimeout(() => {
            const filteredResults = userData.filter((item) => item.email.toLowerCase().includes(e.target.value.toLowerCase()))
            setLoader(false)
            setSearchResults(filteredResults)
        }, [500])
    }
    const handleDelete = (de) => {
        if (window.confirm("Are you sure?")) {
            const wantToDelete = userData.filter((ud) => de !== ud.email)
            console.log("🤡 ~ file: Data.js:58 ~ wantToDelete ~ wantToDelete:", wantToDelete);

            localStorage.setItem('userData', JSON.stringify(wantToDelete))
            Navigate("/data")
            toast.success("User Deleted! Successfully")
        }
    }

    return (
        <>
            {
                <>
                    <h1 className='container text-center'>Data <button className='btn btn-primary float-end my-2' onClick={handleLogout}>Logout</button> <button className='btn btn-primary float-end my-2 mx-2' onClick={() => setDark((prev) => !prev)}>{`${dark ? 'Light' : 'Dark'} Mode`}</button>
                        {/* <form className="d-flex" role="search"> */}
                        <button className="btn btn-outline-success float-end my-2" type="submit">Search</button>
                        <input className="float-end my-2 mx-2 me-1" id='search-box' type="search" value={searchName} onChange={handleSearch} placeholder="Search" aria-label="Search" />
                        {/* <ul>
                        {searchResults}
                    </ul> */}
                        {/* </form> */}
                        {console.log("searchResults", searchResults.length)}
                    </h1>
                    <div className='container'>
                        <table className={`table table-${dark ? 'dark' : 'light'}`}>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>Students List</th>
                                </tr>
                            </thead>
                            {
                                loader
                                    ?
                                    <>loading..........</>
                                    :
                                    searchResults.length ? searchResults.map((data) => <>
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
                                                    <button className='btn btn-primary'
                                                        onClick={() => {
                                                            Navigate(`/students/${data.email}`)
                                                            toast.success(`Students list of ${data.fname} ${data.lname}`)
                                                        }}>Students List</button>
                                                </th>
                                            </tr>
                                        </thead>
                                    </>) : <div>No Data Found</div>}
                        </table>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form>
                                            <div className="container mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={`First Name`} value={fname} onChange={(e) => setFname(e.target.value)} />
                                            </div>
                                            <div className="container mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                                            </div>
                                            <div className='container'>
                                                <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                                                    <option defaultValue={"Select Gender"}>Slelect Gender</option>
                                                    <option value="Female" >Female</option>
                                                    <option value="Male" >Male</option>
                                                    <option value="Other" >Other</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id='close' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary btn-submit" onClick={submitChanges}>Save changes</button>
                                </div>
                                <Toaster />
                            </div>
                        </div>
                    </div>

                </>
            }

        </>

    )
}

export default Data