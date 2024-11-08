import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, InputLabel, MenuItem, FormControl
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import api from '../../service/api';

export default function DialogUserEdit({ open, userId, courseId, handleClose, handleCloseSave }) {
    const [type, setType] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [course, setCourse] = React.useState([]);
    const [courseSelected, setCourseSelected] = useState("");


    useEffect(() => {
        getCourses()
        getUser(userId)
    }, []);

    const getCourses = () => {
        api.get("course").then(resp => {
            setCourse(resp.data);
        }).catch(error => {
            console.log(error)
        })
    }
    const handleCourse = (event) => {
        setCourseSelected(event.target.value);
    };

    const handleSave = (event) => {
        event.preventDefault();

        api.put(`user/${userId}`, {
            name,
            email,
            password,
            password_confirmation: password,
            type_user_fk: type,
        }).then(resp => {
            api.put(`course/${courseSelected}/vinculate-user-student`, {
                user: userId
            }).then(respCourse => {
                handleCloseSave()
            })
        })
    }
    const getUser = (id) => {
        api.get(`user/${id}`).then(resp => {
            if (resp.data) {
                setName(resp.data?.name)
                setEmail(resp.data?.email)
                setType(resp.data?.type_user_fk)
                setCourseSelected(courseId);
            }
        })
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleChangeCourse = (event) => {
        setCourseSelected(event.target.value);
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Senha"
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
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
                            label="type"
                            value={type}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Coordenador</MenuItem>
                            <MenuItem value={2}>Aluno</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    marginTop: 5
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="type"
                            value={courseSelected}
                            onChange={handleChangeCourse}
                        >
                            {course.map(c => {
                                return <MenuItem value={c.id}>{c.name}</MenuItem>
                            })}

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