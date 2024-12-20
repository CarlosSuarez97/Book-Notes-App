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

let readBooks = [];

//Hard-coded data just to try the layout;
const readBooksDemo = [{
    title: "This is a Demo Title",
    author: "John Doe",
    dateRead: "2024",
    rating: "5 out of 5",
    cover: "This is a placeholder for the cover",
    plot: "This is the plot",
    review: "This is a short review"
}, {
    title: "This is a Demo Title 2",
    author: "John Doe 2",
    dateRead: "2024",
    rating: "5 out of 5",
    cover: "This is a placeholder for the cover",
    plot: "This is the plot",
    review: "This is a short review"
}];

//Rendering the welcome page
app.get("/", async (req, res) => {
    res.render("index.ejs", {
        readBooksDemo: readBooksDemo,
    });
})

//Page to write a new review
app.get("/writeReview", async (req, res) => {
    res.render("writeReview.ejs");
})

//Designated port for the application
app.listen(port, () => {
    console.log(`Server now running on port ${port}`);
})