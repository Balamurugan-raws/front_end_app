import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function courseModal({ modalopen }) {

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
    return (
        <>
            <div className='row'>
                <div className='col-5'>
                    <Modal
                        open={modalopen}
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
                                <form>
                                    <div className='row'>
                                        <div className='col-10'>
                                            <p>Course Name</p>
                                            <input placeholder='Course Name' className='form-control' />
                                            <br />
                                            <p>Description</p>
                                            <input placeholder='Description' className='form-control' />
                                        </div>
                                    </div>
                                    <div className='row mt-lg-3'>
                                        <div className='col-lg-5 col-md-8 col-12'>
                                            <button className='btn btn-primary'>Create Course</button>
                                        </div>
                                        <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-0'>
                                            <button className='btn btn-secondary'>Cancel</button>
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

export default courseModal;
