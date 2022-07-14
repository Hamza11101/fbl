import React,{useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import categorieService from '../../services/categories';
import AsyncSelect from 'react-select';

const AddNewCategorie = () => {
    var Navigate = useNavigate();
    const [livres, setLivres] = useState([]);
    useEffect(() => {
      retrieveLivres();
    }, []);
  
    const retrieveLivres = () => {
        categorieService.getAllLivres()
        .then(response => {
            setLivres(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const validationSchema = Yup.object().shape({
        nomcategorie: Yup.string()
            .required("Categorie name is required."),
       
    });
   

    const formik = useFormik({
        initialValues: {
            nomcategorie: "",
          
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                nomcategorie: values.nomcategorie,
                listeDesLivres: JSON.stringify(Options),
            };

            categorieService.createOne(data).then(response => {
                toast.success(response.data.message);
                Navigate("/categories");
            }).catch(error => {
                console.log(error);
                toast.error(error.response.data.message);
            })

        },
    });
    const [Options, setOptions] = useState([])
    const handleChange = (selectedOption) => {
      let selectedIDs = selectedOption.map(item => item.value);
      setOptions(selectedIDs)
  
    }



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">

                <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom component="div">
                    Add new Categorie
                </Typography>

                <form onSubmit={formik.handleSubmit} >
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField fullWidth
                            id="nomcategorie"
                            name="nomcategorie"
                            placeholder="Categorie"
                            value={formik.values.nomcategorie}
                            onChange={formik.handleChange}
                            error={formik.touched.nomcategorie && Boolean(formik.errors.nomcategorie)}
                            helperText={formik.touched.nomcategorie && formik.errors.nomcategorie} label="Categorie Name" variant="outlined" />
                        <AsyncSelect
                isMulti
                name="Livres"
                options={livres}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOption) => { handleChange(selectedOption) }}
              />
                       

                    </Box>
                    <Button fullWidth type='submit' size="small" disableElevation variant="contained" sx={{ mt: 3, fontSize: " 0.8125rem", fontWeight: 500 }}>Add</Button>
                </form>
                <Link to='/categories'>Back</Link>
            </Container>
        </React.Fragment>
    );
}

export default AddNewCategorie;