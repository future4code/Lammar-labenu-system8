import { app } from "./app";
import { createClass } from "./endpoints/createClass";
import { test } from "./endpoints/test";

app.get("/ping", test)


app.post("/class", createClass)