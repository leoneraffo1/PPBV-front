import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, Typography, IconButton
} from '@mui/material';
import api from '../../service/api';
import DownloadIcon from '@mui/icons-material/Download';
const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function DialogViewCard({ open, handleClose, cardId }) {
    const [card, setCard] = useState(null);
    const [files, setFile] = useState([]);

    useEffect(() => {
        getCard(cardId)
    }, []);

    const getCard = () => {
        api.get(`card/${cardId}`).then(resp => {
            setCard(resp.data)
            setFile(resp.data.archive)
        })
    }
    const handleDownload = (file) => {
        let url = `${BASE_URL}/api/archive/download?filename=${file}`
        window.open(url, '_blank');
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={"md"}
        >
            <DialogTitle>Cards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para criar um novo card preencha as informações abaixo
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Titulo"
                    variant="standard"
                    disabled
                    value={card?.title != null ? card?.title : ""}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Descrição"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    disabled
                    value={card?.description != null ? card?.description : ""}
                />
                {files.length > 0 && (
                    <Box>
                        <Typography variant="body1">Arquivos:</Typography>
                        {files.map((file, index) => (
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography key={index} variant="h5">
                                    {file.path}
                                </Typography>
                                <IconButton aria-label="download" onClick={() => handleDownload(file.path)}>
                                    <DownloadIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog >
    );
}

