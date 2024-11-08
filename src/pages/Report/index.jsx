import * as React from 'react';
import { useState } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import api from '../../service/api';

export default function Reports() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleSave = (event) => {
        event.preventDefault();
        api.post("report", {
            message
        })
        navigate("/home", { replace: true });

    }
    const handleClose = () => {
        navigate("/home", { replace: true });
    }
    return (
        <Dialog
            open={true}
            onClose={handleClose}
            fullWidth
            maxWidth={"md"}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => handleSave(event),
            }}
        >
            <DialogTitle>Reporte de erros</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insira as informações referente ao erro
                </DialogContentText>

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Descrição do Erro"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />

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