import React,{useState} from 'react';
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
import livreService from '../../services/livre';





const AddNewLivre = () => {
    var Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        Titre: Yup.string()
            .required("Book title is required."),
        Auteur: Yup.string()
            .required("Auther name is required."),
        Description: Yup.string()
            .required("Description is required."),
    });
    const [selectedFile, setSelectedFile] = useState(null)
    const handelPicChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            setSelectedFile(selectedFile)
        }
    }

    const formik = useFormik({
        initialValues: {
            Titre: "",
            Auteur: "",
            Description: "",
            Contenue: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            var bodyFormData = new FormData();
            bodyFormData.append('Titre', values.Titre);
            bodyFormData.append('Auteur', values.Auteur);
            bodyFormData.append('Description', values.Description);
            bodyFormData.append('Contenue', values.Contenue);

            if (selectedFile != null) {

                bodyFormData.append('picture', selectedFile);
            }

            livreService.createOne(bodyFormData).then(response => {
                toast.success(response.data.message);
                Navigate("/livres");
            }).catch(error => {
                console.log(error);
                toast.error(error.response.data.message);
            })

        },
    });



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">

                <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom component="div">
                    Add new Book
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
                            id="Titre"
                            name="Titre"
                            placeholder="Book title"
                            value={formik.values.Titre}
                            onChange={formik.handleChange}
                            error={formik.touched.Titre && Boolean(formik.errors.Titre)}
                            helperText={formik.touched.Titre && formik.errors.Titre} label="Title" variant="outlined" />
                        <TextField fullWidth
                            id="Auteur"
                            name="Auteur"
                            placeholder="Auther name"
                            value={formik.values.Auteur}
                            onChange={formik.handleChange}
                            error={formik.touched.Auteur && Boolean(formik.errors.Auteur)}
                            helperText={formik.touched.Auteur && formik.errors.Auteur} label="Auther name" variant="outlined" />

                        <TextField fullWidth
                            multiline
                            rows={3}
                            id="Description"
                            name="Description"
                            placeholder="Description"
                            value={formik.values.Description}
                            onChange={formik.handleChange}
                            error={formik.touched.Description && Boolean(formik.errors.Description)}
                            helperText={formik.touched.Description && formik.errors.Description} label="Description" variant="outlined" />
                        <TextField fullWidth
                            multiline
                            rows={6}
                            id="Contenue"
                            name="Contenue"
                            placeholder="Contenue"
                            value={formik.values.Contenue}
                            onChange={formik.handleChange}
                            error={formik.touched.Contenue && Boolean(formik.errors.Contenue)}
                            helperText={formik.touched.Contenue && formik.errors.Contenue} label="Contenue" variant="outlined" />

                        <Button  onChange={(e) => handelPicChange(e)} variant="contained" component="label">
                            Upload Picture
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Box>
                    <Button fullWidth type='submit' size="small" disableElevation variant="contained" sx={{ mt: 3, fontSize: " 0.8125rem", fontWeight: 500 }}>Add</Button>
                </form>
                <Link to='/livres'>Back</Link>
            </Container>
        </React.Fragment>
    );
}

export default AddNewLivre;