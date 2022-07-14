import React, { useState, useEffect } from 'react'
import userService from '../../services/users'
import { toast } from 'react-toastify';
import confirm from '../../services/confirm'
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth'



const columns = [
    { id: 'First name', label: 'First name', minWidth: 130, align: 'center' },
    { id: 'Last name', label: 'Last name', minWidth: 130, align: 'center' },
    {
        id: 'E-mail',
        label: 'E-mail',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'Role',
        label: 'Role',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString(),
    },
    {
        id: 'Actions',
        label: 'Actions',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];





export default function UserTable() {
    const [authId,setAuthId] = useState(AuthService.getAuthUserId)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUsers();
    }, []);



    const retrieveUsers = () => {
        userService.getAllUsers()
            .then(response => {
                setUsers(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
    };

    const removeOneUser = (e, id) => {
        confirm().then((result) => {
            if (result.isConfirmed) {
                userService.removeOne(id)
                    .then(response => {
                        toast.success(response.data.message);
                        refreshList();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        })
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
  
     
    
   
  

    return (
        <div>
               <Typography sx={{ textAlign: 'center' ,mt:'2%'}} variant="h4" gutterBottom component="div">
                    Users Table
                </Typography>
            <Button variant="contained" sx={{ mt: "15px", marginLeft: "10px" }}><AddIcon />
            <Link style={{ textDecoration: "none" }} to='/user/add'>Add new user</Link>
            </Button>
            <Paper >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (

                                <TableRow key={index}  >
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {user.role}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton>
                                            <DeleteIcon onClick={(e) => { removeOneUser(e, user._id) }} 
                                             disabled={authId === user._id} />
                                        </IconButton>
                                     
                                      
                                    </TableCell>
                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
           
        </div>
    );
}
