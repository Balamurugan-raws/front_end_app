import React, { useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import { getCoursecontent } from '../../api/Apiservice'
import { useParams } from 'react-router-dom';


function StudentCourses() {
    const { id } = useParams();
    useEffect(() => {
        getCoursecontent(id)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Navbar />
            <div className='container mt-5'>
                <h2>Chapter Name</h2>
                <div className='card col-10 cardoverflow'>
                    <table className="table table-striped table-lg">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Resource File</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StudentCourses;
