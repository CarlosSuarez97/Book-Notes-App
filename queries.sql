CREATE TABLE book (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title VARCHAR(150),
    cover TEXT,
    rating INTEGER,
    plot TEXT,
    review TEXT
);

CREATE TABLE book_details (
    id SERIAL PRIMARY KEY,
    author VARCHAR(150),
    date_read DATE,
    book_id TEXT,
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE
);