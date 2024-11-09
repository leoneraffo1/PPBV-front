import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/UNIFIL_GRADUACAO.png';
import { useAuth } from '../../../hooks/useAuth';
const NavBar = () => {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <AppBar position="fixed">
            <Toolbar style={{ background: "#f1641f" }}>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <img src={Logo} alt="Logo" />
                </Box>

                <Box display="flex" justifyContent="center" flexGrow={1}>
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    {user.type_user.name === "Coordenador" && <Button color="inherit" component={Link} to="/users">Usuários</Button>}
                    <Button color="inherit" component={Link} to="/report-erros">Reportar Erros</Button>
                </Box>
                <Box display="flex" justifyContent="end" flexGrow={1}>
                    <Button color="inherit" component={Link} onClick={() => handleLogout()}>Sair</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;