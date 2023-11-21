import React from 'react';
import bgimage from '../../Assests/lms.jpg'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { BsFillEyeFill } from 'react-icons/bs'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { SignupAuth } from '../../api/Apiservice'


function Signup() {
    const navigate = useNavigate();
    const [signupdetails, setSignupDetails] = useState({
        username: '',
        password: '',
        email: '',
        confrimemail: '',
        firstname: '',
        lastname: '',
        role: '',
        city: '',
        country: ''
    })
    console.log(signupdetails,"signupdetailssignupdetails");
    const inputValue = (e) => {
        console.log(e.target.value);
        let { name, value } = e.target;
        setSignupDetails({ ...signupdetails, [name]: value })
    }
    const postSignup = async (e) => {
        e.preventDefault();
        let payload = {
            username: signupdetails.username,
            password: signupdetails.password,
            email: signupdetails.email,
            confrimemail: signupdetails.confrimemail,
            firstname: signupdetails.firstname,
            lastname: signupdetails.lastname,
            role: signupdetails.role,
            city: signupdetails.city,
            country: signupdetails.country
        }

        SignupAuth(payload)
            .then((res) => {
                console.log(res)
                alert('created new account')
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const [showPassword, SetShowPassword] = useState(false);
    console.log(showPassword)
    return (
        <>
            <div className='container p-0'>
                <div className='row'>
                    <div className='col-6 mt-5 d-none d-sm-none d-md-none d-lg-block'>
                        <img src={bgimage} className='img-fluid fixed-image' alt='bgimage' />
                    </div>
                    <div className='col-12 col-md-12 col-lg-6' >
                        <div className='row' style={{ height: '140vh' }}>
                            <div className='col-lg-10 col-11 col-md-11 mx-auto my-auto '>
                                <div className='card p-4 text-bg-light rounded-4' >
                                    <p className='fs-4 fw-bold'>Create New Account</p>
                                    <div className='card-body'>
                                        <form>
                                            <p className='fw-bold'>Username</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control required-label" placeholder="Username" name='username' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Password</p>
                                            <div className="input-group">
                                                <input type={showPassword ? 'text' : 'password'} aria-label="First name" name='password' className="form-control" onChange={(e) => { inputValue(e) }} placeholder='password'></input>
                                                {showPassword ? <button className="btn btn-light" type="button" onClick={() => { SetShowPassword(false) }}><BsFillEyeSlashFill /></button> : <button className="btn btn-light" type="button" onClick={() => { SetShowPassword(true) }}><BsFillEyeFill /></button>}
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Email Address</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Email" name='email' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Confrim Email Address</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Confrim Email" name='confrimemail' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>First Name</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="First Name" name='firstname' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Last Name</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Last Name" name='lastname' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Role</p>
                                            <select class="form-select" aria-label="Default select example" name='role' onChange={(e) => { inputValue(e) }} value={signupdetails.role}>
                                                <option value="Instructor">Instructor</option>
                                                <option value="Student">Student</option>
                                            </select>
                                            <br/>
                                            <p className='fw-bold'>City/Town</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="City/Town" name='city' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <p className='fw-bold'>Country</p>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Country " name='country' onChange={(e) => { inputValue(e) }} />
                                            </div>
                                            <br />
                                            <div className='row'>
                                                <div className='col-lg-5 col-md-8 col-12'>
                                                    <button className='btn btn-primary' onClick={postSignup}>Create New Account</button>
                                                </div>
                                                <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-0'>
                                                    <button className='btn btn-secondary'>Cancel</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
