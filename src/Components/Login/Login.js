import React, { FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { BsFillEyeFill } from 'react-icons/bs'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import {LoginAuth} from '../../api/Apiservice'
function Login() {
    const [usename, SetUsename] = useState({
        email:'',
        password:''
    });
    const [showPassword, SetShowPassword] = useState(false);
    console.log(usename)
    // const api='http://localhost:4000'
    // const[teacher,SetTeacher]=useState<string>('');
    // type TeacherClick=React.ChangeEvent<HTMLDivElement>
    // const CardClick=(e:TeacherClick)=>{
    //     console.log(teacher)
    // }
  
    const InputValue = (e) => {
        let { name, value } = e.target;
        SetUsename({ ...usename, [name]: value })
    }

    
    // const studentLogin = (e) => {
        
    //     let email = usename.username === '' || usename.passwords === ''
    //     let password = usename.username === 'nivitha@gmail.com' || usename.passwords === "nivitha"
    //     if (email) {
    //         alert('username and password cannot be empty')
    //     }
    //     else if (!password) {
    //         alert('please enter the valid details')
    //     }
    //     else {
    //         navigate('/admindashboard')
    //     }
    //     let staffauth= usename.username===''||usename.passwords===''
    //     let staffpass=usename.username==='staff@gmail.com'|| usename.passwords==='staff@123'
    //     if(staffauth){
    //         alert('please enter the correct username and password')
    //     }
    //     else if(!staffpass){
    //         alert('wrong username and password' )
    //     }
    //     else{
    //         navigate('/Staffdashboard')
    //     }
    // }
    const navigate = useNavigate();
    const postData = async(e)=>{
        e.preventDefault();
        let payload = {
            email:usename.email,
            password:usename.password
        }
        console.log(payload)
        LoginAuth(payload)
        .then((res)=>{
            console.log(res)
            alert('data saved successfully')
           window.location.reload();
            localStorage.setItem('authentication',res.token)
            localStorage.setItem('role',res.role)
            localStorage.setItem('userid',res.userid )
        })
        .catch((err)=>{
            console.log(err)
            alert('Enter correct username and password')
        })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={postData} >
                    <div className='row justify-content-center align-items-center' style={{ height: '720px' }}>
                        <div className='col-6 bg rounded-4'>
                            <h2 className='text-center mt-5'>LOGIN</h2>
                           
                            <div className='row mt-5 justify-content-center'>
                                <div className='col-12 col-lg-10 col-md-10'>
                                    <div className="input-group">
                                        <span className="input-group-text fw-bold col-12 col-lg-3 col-md-4 " >Username</span>
                                        <input type="text" aria-label="First name" className="form-control" name='email' onChange={(e) => { InputValue(e) }} />
                                    </div>
                                </div>
                                <div className='col-12 col-lg-10 col-md-10 mt-4'>
                                    <div className="input-group">
                                        <span className="input-group-text fw-bold col-12 col-lg-3 col-md-4 ">Password </span>
                                        <input type={showPassword ? 'text' : 'password'} aria-label="First name" name='password' className="form-control" onChange={(e) => { InputValue(e) }} ></input>
                                        {showPassword ? <button className="btn btn-light" type="button" onClick={() => { SetShowPassword(false) }}><BsFillEyeSlashFill /></button>:<button className="btn btn-light" type="button" onClick={()=>{SetShowPassword(true)}}><BsFillEyeFill /></button>}
                                    </div>
                                </div>
                                <button className='btn btn-secondary col-lg-3 col-10 col-md-6 mt-3 rounded-4 fw-bold' >Submit</button>
                                <div className='row mt-4 p-0'>
                                    <div className='col-lg-6 col-md-6 col-12 p-0'>
                                        <a href='#' className='text-decoration-none'><p className='text-center '>Forget Password?</p></a>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-12 p-0'>
                                        <a className='text-decoration-none' onClick={() => { navigate("/newaccount") }}><p className='text-center'>Create New Account</p></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
