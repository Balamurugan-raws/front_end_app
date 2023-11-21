import React, { useEffect, useState } from 'react';
import Admin from '../../Navbar/Navbar'
import profile from '../../Assests/bgim.avif'
import { useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAddedCoursesAll, updateAddedCourses, getSignupAuth, getSigupStaff, getSignupStudent } from '../../api/Apiservice'

function AdminDashboard() {
    const [addCourse, setAddCourse] = useState([])
    const [profiledetails, setProfiledetails] = useState([])
    const [staffDetails, setStaffDetails] = useState([])
    const [studentDetails, setStudentDetails] = useState([])
    const [totalCourses, setTotalCourses] = useState([]);
    console.log(totalCourses.length, 'totot')
    const navigate = useNavigate();

    const showCourse = () => {
        navigate('/Courses')
    }

    const viewStudent = () => {
        navigate('/viewstudent')
    }

    const viewStaff = () => {
        navigate('/viewStaff')
    }
    useEffect(() => {
        getAddedCoursesAll()
            .then((res) => {
                console.log(res.getAllNewCourse)
                setAddCourse(res.getAllNewCourse)
                let totalAddedCourse = res.getAllNewCourse.filter((e) => e.status === 'approved')
                setTotalCourses(totalAddedCourse);
                // if(totalAddedCourse){
                //     let totalApprovedCourses = [...totalCourses];
                // totalApprovedCourses.push(totalAddedCourse);
                // setTotalCourses(totalApprovedCourses);
                // }

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        let userid = localStorage.getItem('userid')
        getSignupAuth(userid)
            .then((res) => {
                console.log(res.Profile, 'result')
                setProfiledetails(res.Profile)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        let staff = 'Instructor'
        getSigupStaff(staff)
            .then((res) => {
                console.log(res)
                setStaffDetails(res.Profile)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        let student = 'Student'
        getSignupStudent(student)
            .then((res) => {
                setStudentDetails(res.Profile)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const approveCourses = async (rowname) => {
        let id = rowname._id
        let payload = {
            coursename: rowname.coursename,
            description: rowname.description,
            status: 'approved'
        }
        console.log(id, payload)
        updateAddedCourses(id, payload)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const disapproveCourses = async (rowname) => {
        let id = rowname._id
        let payload = {
            coursename: rowname.coursename,
            description: rowname.description,
            status: 'decline'
        }
        console.log(id, payload)
        updateAddedCourses(id, payload)
            .then((res) => {
                console.log(res)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#516c91',
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
            <Admin />
            <div className='container'>
                <div className='card p-2 mt-4 col-12 rounded-4 shadow '>
                    <div className='row p-3'>
                        <div className='card col-lg-1 col-12'>
                            <img src={profile} alt='profile' className='card-img-top col-8' />
                        </div>
                        {/* <div className='col-lg-1 col-1'>
                        </div> */}
                        {profiledetails.map((profileInfo) => {
                            const { username, firstname, email, role } = profileInfo
                            return (
                                <>
                                    <div className='col-lg-2 col-6 mx-lg-5 mt-3 mt-lg-0'>Name: {firstname}</div>
                                    <div className='col-lg-2 col-6 mt-3 mt-lg-0'>Username: {username}</div>
                                    <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Email: {email}</div>
                                    <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Role: {role}</div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='row jusitfy-content-center'>
                    <div className='col'>
                        <div className='card p-4 shadow rounded-4 login-card' onClick={() => { viewStaff() }}>
                            <p className='text-center'>Instructors <span className='text-center fs-4'> {staffDetails.length}</span></p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='card p-4 shadow rounded-4 login-card' onClick={() => { viewStudent() }}>
                            <p className='text-center'>Students <span className='text-center fs-4'>{studentDetails.length}</span></p>
                        </div>
                    </div>
                    <div className='col mt-3 mt-lg-0'>
                        <div className='card p-4 shadow rounded-4 login-card' onClick={() => { showCourse() }}>
                            <p className='text-center'>Courses <span className='text-center fs-4'>{totalCourses.length}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <p className='fw-bold text-center'>Newly Added Courses</p>
                            </div>
                            <div className='card-body cardoverflow p-0'>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell >Course Name</StyledTableCell>
                                            <StyledTableCell >Description</StyledTableCell>
                                            <StyledTableCell >Date</StyledTableCell>
                                            <StyledTableCell >Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {addCourse.map((rowname) => {
                                            const { _id, coursename, description, date, status } = rowname
                                            return (
                                                <StyledTableRow key={_id}>
                                                    <StyledTableCell >{coursename}</StyledTableCell>
                                                    <StyledTableCell >{description}</StyledTableCell>
                                                    <StyledTableCell>{date}</StyledTableCell>
                                                    {status === 'approved' ?
                                                        <StyledTableCell>Approved</StyledTableCell>
                                                        :
                                                        status === 'decline' ?
                                                            <StyledTableCell>Disapproved</StyledTableCell>
                                                            :
                                                            <StyledTableCell ><button className='border-0 approve-color rounded-2' onClick={() => { approveCourses(rowname) }}>Approve</button> <button className='border-0 decline-color rounded-2' onClick={() => { disapproveCourses(rowname) }}>Decline</button></StyledTableCell>
                                                    }

                                                </StyledTableRow>
                                            )

                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default AdminDashboard;
