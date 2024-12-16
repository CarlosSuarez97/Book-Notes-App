import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
    database: "booknotes",
    password: "1234",
    user: "postgres",
    host: "localhost",
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

//Rendering the welcome page
app.get("/", async (req, res) => {
    res.render("index.ejs");
})


//Designated port for the application
app.listen(port, () => {
    console.log(`Server now running on port ${port}`);
})