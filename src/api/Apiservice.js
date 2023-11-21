import React from "react"
import axios from "axios"

const api = 'http://localhost:4000'

export const LoginAuth = async(data)=>{
    const LoginData = await axios.post(`${api}/admin/login`,data)
    return LoginData.data ? LoginData.data : null
}
export const SignupAuth = async(data)=>{
    const SignupData = await axios.post(`${api}/admin/signin`,data)
    return SignupData.data ? SignupData.data : null
}

export const getSignupAuth = async(id)=>{
    const getSignupData = await axios.get( `${api}/admin/signin/${id}`)
    return getSignupData.data ? getSignupData.data : null 
}

export const getSigupStaff = async(role)=>{
    const getSignupstaff = await axios.get(`${api}/admin/signin?role=${role}`)
    return getSignupstaff.data ? getSignupstaff.data : null
}

export const getSignupStudent = async(role)=>{
    const getSignupstudent = await axios.get(`${api}/admin/signin?role=${role}`)
    return getSignupstudent.data ? getSignupstudent.data : null
}

export const getAddedCourses = async(id)=>{
    const getAddCourses = await axios.get(`${api}/api/newcoures/${id}`)
    return getAddCourses.data ? getAddCourses.data : null
}

export const getAddedCoursesAll = async()=>{
    const getAddCourses = await axios.get(`${api}/api/newcoures`)
    return getAddCourses.data ? getAddCourses.data : null
}

export const postAddedCourses = async(data)=>{
    const postAddCourses = await axios.post(`${api}/api/newcoures`,data)
    return postAddCourses.data ? postAddCourses.data : null
}

export const updateAddedCourses = async(id,data)=>{
    const updateAddCourses = await axios.put(`${api}/api/newcoures/${id}`,data)
    return updateAddCourses.data ? updateAddCourses.data : null
}

export const getOneAddedCourses = async()=>{
    const getAddCourses = await axios.get(`${api}/api/newcoures/:id`)
    return getAddCourses.data ? getAddCourses.data : null
}

export const DeleteCourse = async(id)=>{
    const deleteAddCourses = await axios.delete(`${api}/api/newcoures/${id}`)
    return deleteAddCourses.data ? deleteAddCourses.data : null
}

// get all Course Content
export const getCoursecontent = async(id)=>{
    const courseData = await axios.get(`${api}/api/course/content/${id}`)
    return courseData.data ? courseData.data : null
}

// post new course content
export const postCoursecontent = async(data)=>{
    const courseData = await axios.post(`${api}/api/course/content`,data)
    return courseData.data ? courseData.data : null
}

// delete one course content 
export const deleteCoursecontent = async(id)=>{
    const courseData = await axios.delete(`${api}/api/course/content/${id}`)
    return courseData.data ? courseData.data : null
}

// delete all content 
export const deleteallCoursecontent = async(id)=>{
    const courseData = await axios.delete(`${api}/api/allcourse/content/${id}`)
    return courseData.data ? courseData.data : null
}

// update course content
export const updateCoursecontent = async(id,data)=>{
    const courseData = await axios.put(`${api}/api/course/content/${id}`,data)
    return courseData.data ? courseData.data : null
}

export const postEntrollForm = async(data)=>{
    const entrollForm = await axios.post(`${api}/api/userEntrollment`,data)
    return entrollForm.data ? entrollForm.data : null
}

export const getEntrollForm = async()=>{
    const entrollment = await axios.get(`${api}/api/userEntrollment`)
    return entrollment.data ? entrollment.data : null
}