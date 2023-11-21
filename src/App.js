import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/SignUP/Signup';
import AdminDashboard from './Components/Admin Dashboard/AdminDashboard';
import Courses from './Components/Admin Dashboard/Courses';
import Dashboard from './Components/Staff Dashboard/Dashboard';
import ShowCourses from './Components/Staff Dashboard/ShowCourses';
import StudentDashboard from './Components/Student Dashboard/StudentDashboard';
import StudentCourses from './Components/Student Dashboard/StudentCourses';
import StudentTable from './Components/Admin Dashboard/StudentTable';
import StaffTable from './Components/Admin Dashboard/StaffTable';
import Questions from './Components/Staff Dashboard/Questions';
import Quzzies from './Components/Staff Dashboard/Quzzies';
import CreateCourseContent from './Components/Staff Dashboard/CreateCourseContent';

function App() {
  const authorization = localStorage.getItem('authentication')
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (authorization && window.location.pathname == '/') {
      if (role === 'Instructor') {
        window.location.href = '/Staffdashboard'
      }else if (role === 'Student') {
        window.location.href = '/Studentdashboard'
      }else if (role === 'Admin') {
        window.location.href = '/admindashboard'
      }
    } else if (!authorization && window.location.pathname !== '/') {
      window.location.href = '/'
    }
  }, [authorization]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/newaccount' element={<Signup />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/Courses' element={<Courses />} />
          <Route path='/Staffdashboard' element={<Dashboard />} />
          <Route path='/ShowCourses' element={<ShowCourses />} />
          <Route path='/CourseContent/:id' element={<CreateCourseContent />} />
          <Route path='/Studentdashboard' element={<StudentDashboard />} />
          <Route path='/AllCourses/:id' element={<StudentCourses />} />
          <Route path='/viewstudent' element={<StudentTable />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/viewstaff' element={<StaffTable />} />
          <Route path='/viewquiz' element={<Quzzies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
