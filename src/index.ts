import { app } from "./app";
import { createClass } from "./endpoints/createClass";
import { CreateTeacher } from "./endpoints/CreateTeacher";
import { GetAllTeachers } from "./endpoints/GetAllTeachers";

app.get("/teachers", GetAllTeachers)
app.post("/class", createClass)
app.post("/teacher", CreateTeacher)
