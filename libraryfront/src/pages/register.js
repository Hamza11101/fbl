import React from 'react';
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
import authservice from '../services/auth';





const Register = () => {
    var Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("First name is required."),
        lastName: Yup.string()
            .min(2, "Too short.")
            .max(10, "Too long.")
            .required("Last name is required."),
        email: Yup.string()
            .email("Invalid email.")
            .required("Email is required."),
        password: Yup.string()
            .required("Password is required.")
            .min(8, "Too short.")
            .max(50, "Too long."),
        confirmPassword: Yup.string()
            .required("Password confirmation is required.")
            .oneOf(
                [Yup.ref("password"), null],
                "not the same passwords"
            ),
      



    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
         

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            

            };
            authservice.register(data).then(response => {
                toast.success("Your account has been created successfully.");
                Navigate("/login");

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
                    Register
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
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name here"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName} label="First name" variant="outlined" />
                        <TextField fullWidth
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name here"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName} label="Last name" variant="outlined" />



                        <TextField fullWidth
                            id="email"
                            name="email"
                            placeholder="Enter your email address here"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} label="Email" type={'email'} variant="outlined" />
                        <TextField fullWidth
                            id="password"
                            name="password"
                            placeholder="Enter your password here"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password} label="Password" type={'password'} variant="outlined" />
                        <TextField fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Enter your confirm password here"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} label="Confirm password" type={'password'} variant="outlined" />
                    </Box>
                    <Button fullWidth type='submit' size="small" disableElevation variant="contained" sx={{ mt: 3, fontSize: " 0.8125rem", fontWeight: 500 }}>Create an account</Button>
                </form>
                <Link to='/login'>Login</Link>
            </Container>
        </React.Fragment>
    );
}

export default Register;