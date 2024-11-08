import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Container, TextField, Typography, CssBaseline, Button, CircularProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import api from '../../../service/api';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const classes = styles();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await api.post("login", {
            email: email,
            password: password,
        })

        if (response.data) {
            setLoading(false);
            login(response.data.user);
            localStorage.setItem("token_ppv", response.data.token)
        }
    };

    return (
        <div className={classes.title}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <div className={classes.imgDiv}>
                        {/* <img
                            className={classes.img}
                            src={`${BPF_SERVER_URL}/showLogo?filename=${url_splt[0]}.png`}
                        /> */}
                    </div>
                    <Typography component="h1" variant="h5">
                        Onboarding Unifil
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="email-ppbv"
                            label="Email"
                            name="email-ppbv"
                            type="email"
                            autoComplete="Email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="password-ppbv"
                            label="Senha"
                            type="password"
                            id="senha-ppbv"
                            autoComplete="current-senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {loading && (
                                <CircularProgress
                                    className={classes.icon}
                                    size={18}
                                    thickness={2}
                                />
                            )}
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};
const styles = makeStyles(() => {
    return {
        paper: {
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            color: "#023575",
            borderRadius: "15px",
            marginTop: "150px",
        },
        card: {
            minWidth: 300,
            marginTop: "6em",
        },

        title: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "#fdba74"

        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: "50px",
            padding: "15px",
        },
        submit: {
            backgroundColor: "#f1641f",
            marginTop: "10px",
            fontWeight: "bold",
            color: "#fff",
        },
        imgDiv: {
            width: "70%",
            height: "auto",
        },
        img: {
            width: "100%",
            padding: "10px",
        },
        imgDivFooter: {
            width: "30%",
            height: "auto",
        },
        img: {
            width: "100%",
            padding: "10px",
        },
    };
});
export default Login;