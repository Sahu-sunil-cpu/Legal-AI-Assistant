import express, { json } from "express";
import { route } from "routes/router";

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api/v1", route)


app.listen(4000, () => {
    console.log("listening on post 4000");
})