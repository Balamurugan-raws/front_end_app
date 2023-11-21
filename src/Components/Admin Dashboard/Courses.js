import React, { useEffect, useState } from 'react';
import Admin from '../../Navbar/Navbar'
import { getAddedCoursesAll } from '../../api/Apiservice'

function Courses() {
    const [addCourse, setAddCourse] = useState([])
    useEffect(() => {
        getAddedCoursesAll()
            .then((res) => {
                console.log(res.getAllNewCourse)
                setAddCourse(res.getAllNewCourse)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <Admin />
            <div className='container'>
                <div className='row justify-content-center mt-lg-5 pt-5'>
                    {addCourse.map((rowname) => {

                        return (
                            <>
                                {rowname.status === 'approved'
                                ?
                                <div className='col-lg-3 col-12'>
                                    <div className='card p-lg-4 p-3 rounded-3 shadow-lg card-border'>
                                        <div className="card-body">
                                            <h5 className="card-title">{rowname.coursename}</h5>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }

                            </>
                        )
                    })}

                </div>
            </div>
        </>
    );
}

export default Courses;
