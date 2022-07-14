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





const Login = () => {
    var Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email.")
            .required("Email is required."),
        password: Yup.string()
            .required("Password is required.")
            .min(8, "Too short.")
            .max(50, "Too long."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const data = {
                email: values.email,
                password: values.password,
            };
            authservice.login(data).then(response => {
                localStorage.setItem('token', response.data.token)
                toast.success("You're logged in successfully.");
                Navigate("/");

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
  
                    </Box>
                    <Button fullWidth type='submit' size="small" disableElevation variant="contained" sx={{ mt: 3, fontSize: " 0.8125rem", fontWeight: 500 }}> Sign in</Button>
                </form>
                <Link to='/register'>Create your account  </Link><br/>
                <Link to="/forgot-password">
                    Forgot your password ?
                </Link>
            </Container>
            
        </React.Fragment>
    );
}

export default Login;