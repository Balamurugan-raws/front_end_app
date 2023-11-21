import React, { useEffect, useState } from 'react';
import logo from '../Assests/logo.png'
import profile from '../Assests/profile.svg'
import { useNavigate } from "react-router-dom"

function Student() {
  const [role, setRole] = useState('')
  const navigate = useNavigate();

  console.log(role)
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  useEffect(() => {
    let roleBasedAuth = localStorage.getItem('role')
    setRole(roleBasedAuth);
  })
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand col-lg-1 col-6 col-md-4" href="#"><img src={logo} alt='logo' className='img-fluid col-4' /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse col-6" id="navbarSupportedContent">
            {role === 'Admin' ?
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-5">
                  <li className="nav-item">
                    <a className="nav-link text-light"  onClick={()=>{navigate('/admindashboard')}}>
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" onClick={()=>{navigate('/Courses')}}>View Courses</a>
                  </li>
                </ul>
              </>
              :
              role === 'Instructor' ?
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-5">
                    <li className="nav-item">
                      <a className="nav-link text-light" onClick={()=>{navigate('/Staffdashboard')}}>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-light" onClick={()=>{navigate('/Courses')}}>Course</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-light" onClick={()=>{navigate('/questions')}}>Question Papper</a>
                    </li>
                    <a className='d-block d-sm-block d-md-none d-lg-none'>
                      <img src={profile} alt='profile' className='img-fluid col-2' />
                    </a>
                  </ul>
                </>
                :
                role === 'Student' ?
                  <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-5">
                      <li className="nav-item">
                        <a className="nav-link text-light" href="../studentdashboard">
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-light" href="../AllCourses"> Courses</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-light" href="../Program">My Progress</a>
                      </li>
                      <a className='d-block d-sm-block d-md-none d-lg-none'>
                        <img src={profile} alt='profile' className='img-fluid col-2' />
                      </a>
                    </ul>
                  </> 
                  :
                  null
            }

          </div>
          <div className='col-2 d-none d-sm-none d-md-block d-lg-block'>
            <a>
              <img src={profile} alt='profile' className='img-fluid col-2' onClick={() => { logout() }} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Student;
