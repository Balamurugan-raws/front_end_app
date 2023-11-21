import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { getCoursecontent, postCoursecontent, deleteCoursecontent, deleteallCoursecontent, updateCoursecontent } from '../../api/Apiservice';
import { useParams } from 'react-router-dom';


function CreateCourse() {
    const { id } = useParams();
    const [courseContentData, setCourseContentData] = useState([]);
    const [updateCoursesContent, setUpdateCoursesContent] = useState([]);
    const [inputValue, setInputValue] = useState({
        Title: '',
        Resourse: ''
    })

    // get Input values
    const changeInputValue = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setInputValue({ ...inputValue, [name]: value })
    }

    // post new course Content
    const createCourseContent = (e) => {
        e.preventDefault();
        let payload = {
            courseid: id,
            title: inputValue.Title,
            resourse: inputValue.Resourse
        }
        postCoursecontent(payload)
            .then((res) => {
                console.log(res);
                setInputValue({
                    Title: '',
                    Resourse: ''
                }
                )
            }).catch((err) => {
                console.log(err);
            })
    }

    // delete single content
    const deleteContent = (id) => {
        deleteCoursecontent(id)
            .then((res) => {
                console.log(res);
                setInputValue({
                    Title: '',
                    Resourse: ''
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    // delete all content 
    const deleteAllContent = () => {
        deleteallCoursecontent(id)
            .then((res) => {
                console.log(res);
                setInputValue({
                    Title: '',
                    Resourse: ''
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    // push update data to state
    const pushUpdateData = (data) => {
        let updatedata = [];
        updatedata.push(data);
        setUpdateCoursesContent(updatedata)
    }

    // update coures content
    const updateCourseContent = (e, data) => {
        e.preventDefault();
        let payload = {
            title: inputValue.Title ? inputValue.Title : data.title,
            resourse: inputValue.Resourse ? inputValue.Resourse : data.resourse
        }
        updateCoursecontent(data._id, payload)
            .then((res) => {
                console.log(res);
                setUpdateCoursesContent([]);
                setInputValue({
                    Title: '',
                    Resourse: ''
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    const clearInputValues = (e) =>{
        e.preventDefault();
        setUpdateCoursesContent([])
        setInputValue({
            Title: '',
            Resourse: ''
        });
    }

    useEffect(() => {
        getCoursecontent(id)
            .then((res) => {
                console.log(res);
                setCourseContentData(res.CourseContent)
            }).catch((err) => {
                console.log(err);
            })
    }, [inputValue,updateCoursesContent])
    return (
        <>
            <Navbar />
            <div className='container mt-lg-5 pt-lg-5'>
                <div className='row'>
                    <div className='col-6'>
                        <h2> Courses Content</h2>
                    </div>
                    <div className='col-4'>
                        <button className='btn btn-primary m-1 d-flex mx-auto' onClick={() => { deleteAllContent() }}>Delete All</button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-9'>
                        <div className='card'>
                            <table className="table table-striped table-xl">
                                <thead>
                                    <tr>
                                        <th className="col-3">Title</th>
                                        <th className="col-4">Resourse</th>
                                        <th className="col-3">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {courseContentData.length > 0 ?
                                        courseContentData.map((data) => {
                                            const { courseid, date, no, resourse, title, _id } = data;
                                            return (
                                                <>
                                                    <tr key={_id}>
                                                        <td>{title}</td>
                                                        <td><a href={resourse} target='_blank'>{resourse}</a></td>
                                                        <td className='d-flex'>
                                                            <button className='btn btn-primary m-1' disabled={updateCoursesContent.length > 0 ? true : false} onClick={() => { pushUpdateData(data) }}>update</button>
                                                            <button className='btn btn-primary m-1' onClick={() => { deleteContent(_id) }}>delete</button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                        :
                                        <>
                                            no data
                                        </>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-3'>
                        {updateCoursesContent.length > 0 ?
                            <>
                                <form>
                                    <div className='card p-3'>
                                        <h4 className='text-center'>Update content</h4>
                                        {updateCoursesContent.map((data) => {
                                            const { courseid, date, no, resourse, title, _id } = data;
                                            return (
                                                <>
                                                    <input type='text' className='form-control' name='Title' placeholder='Title' value={inputValue.Title ? inputValue.Title : title} onChange={(e) => { changeInputValue(e) }} />
                                                    <br />
                                                    <p>Resourse</p>
                                                    <input type='text' className='form-control' name='Resourse' placeholder='Resourse' value={inputValue.Resourse ? inputValue.Resourse : resourse} onChange={(e) => { changeInputValue(e) }} />
                                                    <br />
                                                    <div className='row mx-auto'>
                                                        <div className='col-lg-5 col-md-8 col-12 mt-lg-3'>
                                                            <button className='btn btn-primary' onClick={(e) => { updateCourseContent(e, data) }}>updata</button>
                                                        </div>
                                                        <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-3'>
                                                            <button className='btn btn-secondary'onClick={(e)=>{clearInputValues(e)}}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </form>
                            </>

                            :

                            <>
                                <form>
                                    <div className='card p-3'>
                                        <h4 className='text-center'>Create content</h4>
                                        <p>Title</p>
                                        <input type='text' className='form-control' name='Title' placeholder='Title' value={inputValue.Title} onChange={(e) => { changeInputValue(e) }} />
                                        <br />
                                        <p>Resourse</p>
                                        <input type='text' className='form-control' name='Resourse' placeholder='Resourse' value={inputValue.Resourse} onChange={(e) => { changeInputValue(e) }} />
                                        <br />
                                        <div className='row mx-auto'>
                                            <div className='col-lg-5 col-md-8 col-12 mt-lg-3'>
                                                <button className='btn btn-primary' onClick={(e) => { createCourseContent(e) }}>Create</button>
                                            </div>
                                            <div className='col-lg-6 col-md-4 col-12 mt-3 mt-md-0 mt-lg-3'>
                                                <button className='btn btn-secondary'onClick={(e)=>{clearInputValues(e)}}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        }

                    </div>
                </div>
            </div >

        </>
    );
}

export default CreateCourse;
