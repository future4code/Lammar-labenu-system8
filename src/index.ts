import { app } from "./app";
import { test } from "./endpoints/test";

app.get("/ping", test)
