import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Button, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Box, Typography, IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import api from '../../service/api';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DialogEditCard({ open, handleClose, course, cardId, handleCloseSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cardId) {
            // Carrega os dados do card para edição ao abrir o modal
            api.get(`/card/${cardId}`).then((response) => {
                const { title, description, image, archive } = response.data;
                setTitle(title);
                setDescription(description);
                setImage(image);
                setFiles(archive)
            });
        }
    }, [cardId]);

    const handleSave = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!title || !description) {
            alert("Por favor, preencha todos os campos.");
            setLoading(false);
            return;
        }

        const formDataImage = new FormData();
        if (image && typeof image !== "string") {
            formDataImage.append("file", image);
        }

        const formData = {
            title: title,
            description: description,
            course_fk: course,
        };

        // Se houver uma nova imagem, faz o upload dela
        const uploadImage = image && typeof image !== "string"
            ? api.post("archive/image", formDataImage, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(resp => resp.data.file)
            : Promise.resolve(image);

        uploadImage.then((imagemName) => {
            // Atualiza os dados do card
            api.put(`/card/${cardId}`, {
                ...formData,
                image: imagemName
            }).then((respCard) => {
                if (files.length === 0) {
                    handleCloseSave();
                    setLoading(false);
                } else {
                    // Substitui os arquivos em anexo
                    const uploadFiles = files.filter(file => file.id == null).map((file) => {
                        const formDataArchive = new FormData();
                        formDataArchive.append("file", file);
                        formDataArchive.append("card", cardId);
                        return api.post("archive", formDataArchive, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });
                    });
                    Promise.all(uploadFiles).then(() => {
                        handleCloseSave();
                        setLoading(false);
                    });
                }
            });
        }).catch((error) => {
            alert("Erro ao atualizar o card.");
            setLoading(false);
        });
    };

    const handleDelete = async (archive, index) => {
        try {
            if (archive) {
                await api.delete(`archive/${archive}`);
            }

            // Cria uma cópia do array antes de modificar
            const updatedFiles = [...files];
            updatedFiles.splice(index, 1);
            console.log(updatedFiles)
            setFiles(updatedFiles);
        } catch (error) {
            console.error("Erro ao deletar o arquivo:", error);
        }
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
            <DialogTitle>Editar Card</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edite as informações do card abaixo
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Título"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    required
                    margin="dense"
                    id="description"
                    label="Descrição"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    style={{ margin: 15 }}
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
                        <Typography variant="body2">
                            {typeof image === "string" ? image : image.name}
                        </Typography>
                    </Box>
                )}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-2}
                    startIcon={<CloudUploadIcon />}
                    style={{ margin: 15 }}
                >
                    Arquivos em anexo
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFiles(Array.from(event.target.files))}
                        multiple
                    />
                </Button>
                {files.length > 0 && (
                    <Box>
                        <Typography variant="body1">Arquivos Selecionados:</Typography>
                        {files.map((file, index) => (
                            <Box key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography key={index} variant="body2">
                                    {file.id == null ? file.name : file.path}
                                </Typography>
                                <IconButton key={`delete-${index}`} aria-label="delete" onClick={() => handleDelete(file.id, index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" disabled={loading}>Salvar</Button>
            </DialogActions>
        </Dialog>
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