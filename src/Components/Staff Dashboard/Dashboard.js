import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar'
import profile from '../../Assests/bgimage.avif'
import CourseModal from './modal/courseModal';
import QuestionModal from './modal/QuestionModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAddedCourses, postAddedCourses, updateAddedCourses, DeleteCourse, getSignupAuth } from '../../api/Apiservice'

function Dashboard() {
    const [open, setOpen] = useState(false);
    const [addCourse, setAddCourse] = useState([])
    const [openQuestion, setOpenQuestion] = useState(false);
    const [updateCourses, setUpdateCourses] = useState([]);
    const [inputvalue, SetInputValue] = useState({
        coursename: '',
        description: ''
    })
    const [profiledetails, setProfiledetails] = useState([])
    const navigate = useNavigate();


    // setting input values
    const InputValue = (e) => {
        let { name, value } = e.target;
        SetInputValue({ ...inputvalue, [name]: value })
    }


    // clear Input field
    const clearInputField = (e) => {
        e.preventDefault();
        SetInputValue({
            coursename: '',
            description: ''
        });
        setUpdateCourses([]);
    }

    // get course data
    useEffect(() => {
        let id = localStorage.getItem('userid')
        getAddedCourses(id)
            .then((res) => {
                console.log(res.getOneNewCourse)
                setAddCourse(res.getOneNewCourse)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [updateCourses, inputvalue])

    useEffect(() => {
        let userid = localStorage.getItem('userid')
        getSignupAuth(userid)
            .then((res) => {
                console.log(res)
                setProfiledetails(res.Profile)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    // adding new coures
    const postAddedCourse = async (e) => {
        e.preventDefault();
        let userid = localStorage.getItem('userid')
        console.log(userid);
        let payload = {
            userid: userid,
            coursename: inputvalue.coursename,
            description: inputvalue.description,
            status: 'pending'
        }
        postAddedCourses(payload)
            .then((res) => {
                alert('created new course')
                console.log(res)
                SetInputValue({
                    coursename: '',
                    description: ''
                });
            })
            .catch((err) => {
                console.log(err)
                alert('please enter all the values')
            })
    }


    // push update data to state
    const pushUpdateData = (data) => {
        let updatedata = [];
        updatedata.push(data);
        setUpdateCourses(updatedata)

    }


    // update course data
    const updateCourseData = (e, data) => {
        e.preventDefault();
        let payload = {
            coursename: inputvalue.coursename ? inputvalue.coursename : data.coursename,
            description: inputvalue.description ? inputvalue.description : data.description,
            status: data.status
        }
        updateAddedCourses(data._id, payload)
            .then((res) => {
                console.log(res);
                setUpdateCourses([]);
                SetInputValue({
                    coursename: '',
                    description: ''
                });
            }).catch((err) => {
                console.log(err)
            })
    }

    const deleteOneCourse = (id) => {
        DeleteCourse(id)
            .then((res) => {
                console.log(res);
                setUpdateCourses([]);
            }).catch((err) => {
                console.log(err);
            })

    }


    const closeModal = () => {
        setOpen(false)
    }
    const closeModalQuestion = () => {
        setOpenQuestion(false)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#6a4e6b',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));



    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='card p-2 mt-4 col-lg-12 rounded-4 shadow '>
                    <div className='row p-3'>
                        <div className='card col-lg-1 col-12'>
                            <img src={profile} alt='profile' className='card-img-top col-8' />
                        </div>
                        {profiledetails.map((profileinfo) => {
                            const { username, firstname, email, role } = profileinfo
                            return (
                                <>
                                    <div className='col-lg-2 col-6 mx-lg-5 mt-3 mt-lg-0'>Name: {firstname}</div>
                                    <div className='col-lg-2 col-6 mt-3 mt-lg-0'>Username: {username}</div>
                                    <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Email: {email}</div>
                                    <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Designation: {role}</div>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-9'>
                        <div className='card cardheight'>
                            <div className='card-header'>
                                <p className='fw-bold text-center'>Added Courses</p>
                            </div>
                            <div className='card-body cardoverflow p-0'>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell >Course Name</StyledTableCell>
                                            <StyledTableCell >Description</StyledTableCell>
                                            <StyledTableCell >Date</StyledTableCell>
                                            <StyledTableCell >Status</StyledTableCell>
                                            <StyledTableCell>Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {addCourse.map((rowname) => {
                                            const { _id, coursename, description, date, status } = rowname
                                            return (
                                                <>
                                                    <StyledTableRow key={_id} >
                                                        <StyledTableCell onClick={() => { navigate(`/CourseContent/${_id}`) }}>{coursename}</StyledTableCell>
                                                        <StyledTableCell onClick={() => { navigate(`/CourseContent/${_id}`) }}>{description}</StyledTableCell>
                                                        <StyledTableCell onClick={() => { navigate(`/CourseContent/${_id}`) }}>{date}</StyledTableCell>
                                                        <StyledTableCell className={status === 'approved' ? 'approved-color' : status === 'decline' ? 'dispprove-color' : status === 'pending' ? 'pending-color' : null} onClick={() => { navigate(`/CourseContent/${_id}`) }}>{status} </StyledTableCell>
                                                        <StyledTableCell>
                                                            <button className='btn btn-primary m-1' disabled={updateCourses.length > 0 ? true : false} onClick={() => { pushUpdateData({ _id, coursename, description, date, status }) }}>update</button>
                                                            <button className='btn btn-primary m-1'
                                                                onClick={() => { deleteOneCourse(_id) }}>delete</button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                </>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        {updateCourses.length > 0 ?
                            <>
                                <div className='card'>
                                    <div className='card-header'>
                                        <p className='text-center'>
                                            Update Course
                                        </p>
                                    </div>
                                    {updateCourses.map((data) => {
                                        const { _id, coursename, description, date, status } = data
                                        return (
                                            <>
                                                <div className='card-body' key={_id}>
                                                    <form >
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <p>Course Name</p>
                                                                <input type='text' className='form-control' name='coursename' defaultValue={inputvalue.coursename ? inputvalue.coursename : coursename} onChange={(e) => { InputValue(e) }} />
                                                            </div>
                                                            <div className='col-12'>
                                                                <p>Description</p>
                                                                <textarea type='text' className='form-control' name='description' defaultValue={description} onChange={(e) => { InputValue(e) }} />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-lg-5 col-md-8 col-12 mt-lg-3'>
                                                                <button className='btn btn-primary' onClick={(e) => { updateCourseData(e, data) }}>Update </button>
                                                            </div>
                                                            <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-3'>
                                                                <button className='btn btn-secondary' onClick={(e) => { clearInputField(e) }}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </>
                                        )
                                    })}

                                </div>
                            </>

                            :
                            <>
                                <div className='card'>
                                    <div className='card-header'>
                                        <p className='text-center'>
                                            Create Course
                                        </p>
                                    </div>
                                    <div className='card-body'>
                                        <form>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <p>Course Name</p>
                                                    <input type='text' className='form-control' name='coursename' value={inputvalue.coursename} onChange={(e) => { InputValue(e) }} />
                                                </div>
                                                <div className='col-12'>
                                                    <p>Description</p>
                                                    <textarea type='text' className='form-control' name='description' value={inputvalue.description} onChange={(e) => { InputValue(e) }} />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-5 col-md-8 col-12 mt-lg-3'>
                                                    <button className='btn btn-primary' onClick={(e) => { postAddedCourse(e) }}>Create </button>
                                                </div>
                                                <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-3'>
                                                    <button className='btn btn-secondary' onClick={(e) => { clearInputField(e) }}>Cancel</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }


                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
