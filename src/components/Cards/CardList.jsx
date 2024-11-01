import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Grid2 from '@mui/material/Grid';
import Card from './Card';
import Button from '@mui/material/Button';

function CardList({ initialCards, handleCardView }) {
    const [cards, setCards] = useState(initialCards);
    const [isEditing, setIsEditing] = useState(false);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedCards = Array.from(cards);
        const [movedCard] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, movedCard);

        setCards(reorderedCards);

        // // Enviar a nova ordem para o backend
        // reorderedCards.forEach((card, index) => {
        //     fetch(`/card/${card.id}/order`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ order: index + 1 }),
        //     });
        // });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="card-list" direction="vertical">
                {(provided) => (
                    <Grid2 container spacing={2} {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                                {(provided) => (
                                    <Grid2
                                        item xs={12} sm={6} md={4}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card
                                            key={card.id}
                                            cardId={card.id}
                                            title={card.title}
                                            description={card.description}
                                            image={card.image}
                                            handleCard={() => handleCardView(card.id)}
                                        />
                                    </Grid2>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Grid2>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default CardList;
