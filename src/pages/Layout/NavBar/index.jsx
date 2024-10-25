import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.jpg';
const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{ background: "#f1641f" }}>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <img src={"https://unifil.br/assets/uploads/2022/11/logo-unifil.svg"} alt="Logo" />
                </Box>

                <Box display="flex" justifyContent="center" flexGrow={1}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/usuarios">Usuários</Button>
                    <Button color="inherit" component={Link} to="/reportar-erros">Reportar Erros</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;