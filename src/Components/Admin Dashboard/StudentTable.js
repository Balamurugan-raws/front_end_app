import React, { useEffect, useState } from 'react';
import Admin from '../../Navbar/Navbar'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getSignupStudent } from '../../api/Apiservice'

function StudentTable() {
  const [studentDetail, setStudentDetail] = useState([])
  useEffect(() => {
    let student = 'Student'
    getSignupStudent(student)
      .then((res) => {
        console.log(res)
        setStudentDetail(res.Profile)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#516c91',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <>
      <Admin />
      <div className='container mt-lg-5'>
        <h2>Student Details</h2>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >Username</StyledTableCell>
              <StyledTableCell >Email Id</StyledTableCell>
              <StyledTableCell >City</StyledTableCell>
              <StyledTableCell >Country</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentDetail.map((students) => {
              const { firstname, username, email, city, country } = students
              return (
                <>
                  <StyledTableRow >
                    <StyledTableCell >{firstname}</StyledTableCell>
                    <StyledTableCell >{username}</StyledTableCell>
                    <StyledTableCell>{email}</StyledTableCell>
                    <StyledTableCell>{city}</StyledTableCell>
                    <StyledTableCell>{country}</StyledTableCell>
                  </StyledTableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default StudentTable;
