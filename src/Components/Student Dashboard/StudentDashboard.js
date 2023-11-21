import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import profile from '../../Assests/student.png'
import program from '../../Assests/program.jpeg'
import { getSignupAuth, getAddedCoursesAll,getEntrollForm } from '../../api/Apiservice'
import { useNavigate } from 'react-router-dom';
import CourseEntroll from './Modal/CourseEntroll';

function StudentDashboard() {
  const [open, setOpen] = useState(false);
  const [studentDetials, setStudentDetails] = useState([]);
  const [viewCourse, setViewCourse] = useState([]);
  const [entrollFormEmail,setEntrollFormEmail] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let userid = localStorage.getItem("userid")
    getSignupAuth(userid)
      .then((res) => {
        console.log(res.Profile)
        setStudentDetails(res.Profile)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    getAddedCoursesAll()
      .then((res) => {
        console.log(res.getAllNewCourse)
        setViewCourse(res.getAllNewCourse)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(()=>{
    getEntrollForm()
    .then((res)=>{
      console.log(res.formDetails)
      setEntrollFormEmail(res.formDetails)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  const entrollment = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <>
      <Navbar />
      
      {open && <CourseEntroll openModal={open} handleClose={handleClose} />}

      <div className='container mt-5'>
        <div className='card p-1 mt-4 col-lg-12 rounded-3 shadow '>
          <div className='row p-3 justify'>
            <div className='card col-lg-1 col-12 border-0'>
              <img src={profile} alt='profile' className='card-img-top col-11' />
            </div>
            {studentDetials.map((studentdata) => {
              const { firstname, username, email, role } = studentdata
              return (
                <>
                  <div className='col-lg-2 col-6 mx-lg-5 mt-3 mt-lg-0'>Name: {firstname}</div>
                  <div className='col-lg-2 col-6 mt-3 mt-lg-0'>Username: {username}</div>
                  <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Email Id: {email}</div>
                  <div className='col-lg-3 col-6 mt-3 mt-lg-0 '>Role: {role}</div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center'>

          {viewCourse.map((cardData) => {
            const { _id, coursename, description, status } = cardData;
            if (status === 'approved')
              return (
                <>
                  <div className='col-3 p-0' key={_id}>
                    <div className='card m-3' onClick={() => { entrollment() }} >
                      <div className='card-body'>
                        <img src={program} className='img-fluid' alt='program' />
                        <h3>{coursename}</h3>
                        <p>{description}</p>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="70"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
                            70%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
          })}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
