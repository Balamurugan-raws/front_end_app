import React, { useEffect, useState } from 'react';
import Admin from '../../Navbar/Navbar'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getSigupStaff } from '../../api/Apiservice'

function StaffTable() {
  const [staffDetails, SetStaffDetails] = useState([])
  useEffect(() => {
    let staff = 'Instructor'
    getSigupStaff(staff)
      .then((res) => {
        console.log(res.Profile)
        SetStaffDetails(res.Profile)
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
        <h2>Instructor Details</h2>
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
            
              {staffDetails.map((tableDetails) => {
                const { firstname, username, email, city, country } = tableDetails
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

export default StaffTable;
