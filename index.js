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


//Rendering the welcome page
app.get("/", async (req, res) => {
    try {
        const result  = await db.query("SELECT book.id, book.title, book.rating, book.cover, book.plot, book.review, book_details.author, book_details.date_read FROM book INNER JOIN book_details ON book.id = book_details.book_id;");
        readBooks = result.rows;
        res.render("index.ejs", {
            readBooks: readBooks,
        })
    } catch(err) {
        console.log(err);
    }
});

//Deleting a review
app.post("/deleteReview", async (req, res) => {
    const reviewToDelete = req.body.deleteReview;
    try {
        await db.query("DELETE FROM book WHERE id = $1", [reviewToDelete]);
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }

})

//Page to write a new review
app.get("/writeReview", async (req, res) => {
    res.render("writeReview.ejs");
})

//Adding a new review to the database
app.post("/addReview", async (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const isbn = req.body.isbn;
    const plot = req.body.plot;
    const review = req.body.review;
    const dateRead = req.body.dateRead;
    const rating = req.body.rating;
    const cover = "https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg";


    try {
        await db.query("INSERT INTO book (title, cover, rating, plot, review, id) VALUES ($1, $2, $3, $4, $5, $6)", [title, cover, rating, plot, review, isbn]).then(db.query("INSERT INTO book_details (author, date_read, book_id) VALUES ($1, $2, $3)", [author, dateRead, isbn]));
    } catch(err) {
        console.log(err);
    }

    res.redirect("/");
})

//Designated port for the application
app.listen(port, () => {
    console.log(`Server now running on port ${port}`);
})