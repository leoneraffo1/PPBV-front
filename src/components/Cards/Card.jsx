import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardCourse() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://t.ctcdn.com.br/AD7TBmA94FXeu_izgtM6k7X9qOw=/1024x576/smart/i743626.jpeg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          IA
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          A inteligência artificial (IA) representa a capacidade de uma máquina em reproduzir habilidades semelhantes às humanas, englobando aspectos como raciocínio, aprendizagem, planejamento e criatividade. Neste curso você irá aprender sobre a história da inteligência artificial
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}