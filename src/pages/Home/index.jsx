import React, { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import { Box, Grid2, InputLabel, Select, FormControl, MenuItem, Button, CircularProgress } from "@mui/material";
import api from "../../service/api";
import AddIcon from '@mui/icons-material/Add';
import DialogControllCard from "./ControllCard";
import DialogViewCard from "./ViewCard";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from "../../hooks/useAuth";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [controlCard, setControllCard] = useState(false);
    const [viewCard, setViewCard] = useState(false);
    const [cards, setCards] = useState([]);
    const [cardSelected, setCardSelected] = useState(null);
    const [courses, setCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        getCourses()
    }, []);

    const getCourses = () => {
        api.get("course").then(resp => {
            setCourse(resp.data);
            if (resp.data.length === 1) {
                setCourseSelected(resp.data[0].id)
                getCards(resp.data[0].id)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const getCards = (course) => {
        setLoading(true)
        api.get("card", {
            params: {
                course
            }
        }).then(resp => {
            setCards(resp.data);
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    }

    const handleCourse = (event) => {
        setCourseSelected(event.target.value);
        getCards(event.target.value);
    };
    const handleAddCard = () => {
        setControllCard(true)
    }

    const handleCloseCardSave = () => {
        setControllCard(false)
        getCards(courseSelected);
    }
    const handleCardView = async (id) => {
        await setCardSelected(id)
        setViewCard(true)
        if (user.type_user.name != "Coordenador") {
            api.post(`card/${id}/view`)
        }
    }

    const deleteCard = async (id) => {
        setLoading(true)
        api.delete(`card/${id}`).then(resp => {
            getCards(courseSelected);
        })
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedCards = reorder(
            cards,
            result.source.index,
            result.destination.index
        );
        setCards(reorderedCards);
    }

    const saveOrderCards = () => {
        cards.forEach((card, index) => {
            api.put(`/card/${card.id}/order`, {
                order: index
            }).then(resp => {
                if (index + 1 === cards.length) {
                    setIsEditing(!isEditing)
                }
            })
        });
    }
    return (
        <Box sx={{ padding: 2, marginBottom: 10 }} >
            {controlCard && <DialogControllCard open={controlCard} course={courseSelected} handleCloseSave={() => handleCloseCardSave()} handleClose={() => setControllCard(false)} />}
            {viewCard && <DialogViewCard open={viewCard} cardId={cardSelected} handleClose={() => { setViewCard(false); setCardSelected(null) }} />}
            <FormControl fullWidth style={{ margin: "20px 0px 20px 0px" }} >
                <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Curso"
                    value={courseSelected}
                    onChange={handleCourse}
                >
                    {courses.map(course => {
                        return <MenuItem value={course.id} key={course.id}>
                            {course.name}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
            {user.type_user.name === "Coordenador" && <Box sx={{ padding: 2 }} >
                <Button variant="contained" disabled={!courseSelected} onClick={handleAddCard} endIcon={<AddIcon />}>
                    Adicionar Card
                </Button>
            </Box>}
            <Grid2 container spacing={4}>
                <Box style={{ display: 'flex', justifyContent: "center", width: "100%" }}>
                    {loading && <CircularProgress />}
                </Box>
                {user.type_user.name === "Coordenador" && <Box style={{ display: 'flex', justifyContent: "end", width: "100%" }}>
                    <Button variant="contained" disabled={!courseSelected} onClick={() => { isEditing ? saveOrderCards() : setIsEditing(!isEditing) }}>
                        {isEditing ? "Salvar Ordem" : "Editar Ordem"}
                    </Button>
                </Box>}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={String(card.id)} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                // {...provided.dragHandleProps}
                                                {...(isEditing ? provided.dragHandleProps : {})}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Card
                                                    cardId={card.id}
                                                    title={card.title}
                                                    description={card.description}
                                                    image={card.image}
                                                    handleCard={() => handleCardView(card.id)}
                                                    deleteCard={() => deleteCard(card.id)}
                                                    type={user.type_user.name}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* {cards.map((card) => (
                    <Grid2 item xs={12} sm={6} md={4} key={card.id}>
                        <Card key={card.id} cardId={card.id} title={card.title} description={card.description} image={card.image} handleCard={(cardId) => handleCardView(cardId)} />
                    </Grid2>
                ))} */}
            </Grid2 >
        </Box >

    );
}
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "grey" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    flexWrap: 'wrap'
});
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};