import * as React from 'react';
import { useState } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, InputLabel, MenuItem, FormControl
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import api from '../../service/api';

export default function DialogUser({ open, handleClose, course, handleCloseSave }) {
    const [type, setType] = React.useState('');

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData).entries());
        const name = formJson.name;
        const email = formJson.email;
        const password = formJson.password;
        api.post("register", {
            name,
            email,
            password,
            password_confirmation: password,
            type_user_fk: type,
        }).then(resp => {
            let user = resp.data.user.id
            api.put(`course/${course}/vinculate-user`, {
                user: user
            }).then(respCourse => {
                handleCloseSave()
            })
        })
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={"md"}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => handleSave(event),
            }}
        >
            <DialogTitle>Usuários</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para criar um novo usuário preencha as informações abaixo
                </DialogContentText>
                <Box sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
                    autoComplete="off">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="name"
                        label="Nome"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type='email'
                    />
                    <TextField
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Senha"
                        type='password'
                    />
                </Box>
                <Box sx={{
                    marginTop: 5
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Acesso</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="type"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Coordenador</MenuItem>
                            <MenuItem value={2}>Aluno</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </DialogActions>
        </Dialog >
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});