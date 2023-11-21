import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {postEntrollForm} from '../../../api/Apiservice'

function CourseEntroll({openModal, handleClose}) {
    const [inputField,setInputField] = useState({
        firstname:'',
        lastname:'',
        emailid:'',
        number:''
    })
    console.log(inputField)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { lg: 600, xs: 300 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        borderRadius: 5
    };
    
    const inputValue =(e)=>{
        let {name,value} = e.target;
        setInputField({...inputField,[name]:value})
    }
    const postEntrollment = (e)=>{
        e.preventDefault();
        let payload = {
            firstname : inputField.firstname,
            lastname : inputField.lastname,
            emailid : inputField.emailid,
            phonenumber : inputField.phonenumber
        }
        console.log(payload);
        postEntrollForm(payload)
        .then((res)=>{
            console.log(res)
            alert('successfully entrolled your course')
            handleClose()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <div className='row'>
                <div className='col-5'>
                    <Modal
                        open={openModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='row'>
                                <div className='col-8'>
                                    <p id="modal-modal-title" variant="h6" component="h2">
                                        Create Course Topic
                                    </p>
                                </div>
                            </div>
                            <p id="modal-modal-description" sx={{ mt: 2 }}>
                                <form onSubmit={postEntrollment}>
                                    <div className='row'>
                                        <div className='col-10'>
                                            <p>First Name</p>
                                            <input placeholder='Course Name' name='firstname' onChange={(e)=>{inputValue(e)}} className='form-control' />
                                            <br />
                                            <p>Last Name</p>
                                            <input placeholder='Description' name='lastname' onChange={(e)=>{inputValue(e)}} className='form-control' /> <br />
                                            <p>Email</p>
                                            <input placeholder='Description' name='emailid' onChange={(e)=>{inputValue(e)}} className='form-control' /> <br />
                                            <p>Phone Number</p>
                                            <input placeholder='Description' name='phonenumber'  onChange={(e)=>{inputValue(e)}} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='row mt-lg-3'>
                                        <div className='col-lg-5 col-md-8 col-12'>
                                            <button className='btn btn-primary'>Create Course</button>
                                        </div>
                                        <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-0'>
                                            <button className='btn btn-secondary' onClick={() => { handleClose() }}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </p>
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default CourseEntroll;
