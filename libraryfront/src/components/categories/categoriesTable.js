import React, { useState, useEffect } from 'react'
import categorieService from '../../services/categories'
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




const columns = [
    { id: 'Categorie name', label: 'Categorie name', minWidth: 130, align: 'center' },
    { id: 'Books', label: 'Books', minWidth: 130, align: 'center' },
   
    {
        id: 'Actions',
        label: 'Actions',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];





export default function CategoriesTable() {


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveCategories();
    }, []);



    const retrieveCategories = () => {
        categorieService.getAllCategories()
            .then(response => {
                setCategories(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveCategories();
    };

    const removeOneCategorie = (e, id) => {
        confirm().then((result) => {
            if (result.isConfirmed) {
                categorieService.removeOne(id)
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
                    Categories Table
                </Typography>
            <Button variant="contained" sx={{ mt: "15px", marginLeft: "10px" }}><AddIcon />
            <Link style={{ textDecoration: "none" }} to='/categories/add'>Add new categorie</Link>
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
                            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((categorie, index) => (

                                <TableRow key={index}  >
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {categorie.nomcategorie}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                    {categorie.listeDesLivres.map((liv)=> (
<span>{liv.Titre}</span>
                                    ))}
                                    </TableCell>
                                
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton>
                                            <DeleteIcon onClick={(e) => { removeOneCategorie(e, categorie._id) }} 
                                             />
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
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
           
        </div>
    );
}
