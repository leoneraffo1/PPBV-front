import * as React from 'react';
import { useState } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import api from '../../service/api';
export default function DialogControllCard({ open, handleClose, course, handleCloseSave }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [files, setFile] = useState([]);
    const handleSave = (event) => {
        event.preventDefault();
        setLoading(true)
        if(image == null){
            alert("Insira uma imagem");
        }
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData).entries());
        const title = formJson.title;
        const description = formJson.description;

        const formDataImage = new FormData();
        formDataImage.append("file", image);
        api.post("archive/image", formDataImage, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((respImage) => {
                let imagemName = respImage.data.file
                api.post("/card", {
                    title: title,
                    description: description,
                    image: imagemName,
                    course_fk: course,
                }).then((respCard) => {
                    if (files.length == 0) {
                        handleCloseSave()
                        setLoading(false)
                    }
                    files.forEach((file, index) => {
                        const formDataArchive = new FormData();
                        formDataArchive.append("file", file);
                        formDataArchive.append("card", respCard.data.id);
                        api.post("archive", formDataArchive, {
                            headers: { "Content-Type": "multipart/form-data" },
                        }).then((respFile) => {
                            if (index + 1 === files.length) {
                                handleCloseSave()
                                setLoading(false)
                            }
                        });
                    });

                });
            });
    }
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
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    style={{
                        margin: 15
                    }}
                >
                    Imagem
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                </Button>
                {image && (
                    <Box>
                        <Typography variant="body1">Imagem Selecionada:</Typography>
                        <Typography variant="body2">{image.name}</Typography>
                    </Box>
                )}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-2}
                    startIcon={<CloudUploadIcon />}
                    style={{
                        margin: 15
                    }}
                >
                    Arquivos em anexo
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFile(Array.from(event.target.files))}
                        multiple
                    />
                </Button>
                {files.length > 0 && (
                    <Box>
                        <Typography variant="body1">Arquivos Selecionados:</Typography>
                        {files.map((file, index) => (
                            <Typography key={index} variant="body2">
                                {file.name}
                            </Typography>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" disabled={loading}>Salvar</Button>
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