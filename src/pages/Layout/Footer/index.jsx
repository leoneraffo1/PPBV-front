import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 2,
                position: 'fixed',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #ddd',
                background: "#f1641f"
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © 2024 UniFil. Todos os direitos reservados.
            </Typography>
        </Box>
    );
};

export default Footer;