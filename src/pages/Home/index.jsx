import React, { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import { Box, Grid2, InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import api from "../../service/api";

export default function Home() {
    const [cards, setCards] = useState([1, 2, 3, 4]);
    const [courses, setCourse] = useState([]);

    useEffect(() => {
        getCourses()
    }, []);

    const getCourses = () => {
        api.get("course").then(resp => {
            setCourse(resp.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const getCards = (course) => {
        api.get("card", {
            params: {
                course
            }
        }).then(resp => {
            setCards(resp.data);
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Box sx={{ padding: 2 }} >
            <FormControl fullWidth style={{ margin: "20px 0px 20px 0px" }} >
                <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Curso"
                >
                    {courses.map(course => {
                        <MenuItem value={course.id}>
                            {course.name}
                        </MenuItem>

                    })}
                    <MenuItem value={20}>Ciência da Computação</MenuItem>
                    <MenuItem value={30}>Engenharia de Software</MenuItem>
                </Select>
            </FormControl>
            <Grid2 container spacing={4}>
                {cards.map((card) => (
                    <Grid2 item xs={12} sm={6} md={4} key={card.id}>
                        <Card title={card.title} description={card.description} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>

    );
}