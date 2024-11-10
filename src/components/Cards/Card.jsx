import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const BASE_URL = process.env.REACT_APP_SERVER_URL;

export default function CardCourse({ title, description, image, cardId, handleCard, deleteCard, type , handleEdit }) {
  return (
    <Card sx={{ width: 345, minHeight: 350 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${BASE_URL}/api/archive/image?filename=${image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleCard(cardId)}>Ver mais</Button>
        {type === "Coordenador" && < Button size="small" onClick={() => deleteCard(cardId)} color="error">Excluir Card</Button>}
        <Button size="small" onClick={() => handleEdit(cardId)}>Editar</Button>
      </CardActions>
    </Card >
  );
}