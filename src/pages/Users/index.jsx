import { Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import MaterialTable from "../../components/Cards/Table";
import { Box, Grid2, InputLabel, Select, FormControl, MenuItem, Button, CircularProgress } from "@mui/material";
import api from "../../service/api";
import { useAuth } from "../../hooks/useAuth";
import DialogUser from "./NewUsers";

export default function Users() {
    const [users, setUser] = useState([]);
    const [courses, setCourse] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [courseSelected, setCourseSelected] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        getCourses()
    }, []);

    const getCourses = () => {
        api.get("course").then(resp => {
            setCourse(resp.data);
            if (resp.data.length === 1) {
                setCourseSelected(resp.data[0].id)
                getUsers(resp.data[0].id)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const getUsers = (course) => {
        api.get(`/course/${course}/user`).then(resp => {
            setUser(resp.data.users)
        })
    }
    const handleCourse = (event) => {
        setCourseSelected(event.target.value);
        getUsers(event.target.value)
    };
    const handleAdd = () => {
        setNewUser(true)
    }
    const handleCloseCardSave = () => {
        getUsers(courseSelected)
        setNewUser(false)
    }
    return (
        <div style={{
            padding: 20
        }}>
            {newUser && <DialogUser open={newUser} course={courseSelected} handleCloseSave={() => handleCloseCardSave()} handleClose={() => setNewUser(false)} />}

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
            <MaterialTable rows={users} handleAdd={handleAdd} type={user.type_user.name} />
        </div>
    );
}