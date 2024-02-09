const { readFile, writeFile } = require("fs");
const path = require("path");

const booksDBPath = path.join(__dirname, "db", "books.json");
const authorsDBPath = path.join(__dirname, "db", "authors.json");

const booksControllers = {
	getAllBooks: (_, res) => {
		readFile(booksDBPath, "utf-8", (err, books) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}
			res.end(books);
		});
	},

	addBook: (req, res) => {
		const newBook = req.body;

		readFile(booksDBPath, "utf-8", (err, books) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingBooks = JSON.parse(books);
			newBook.id = existingBooks.length + 1;
			const allBooks = [...existingBooks, newBook];

			writeFile(booksDBPath, JSON.stringify(allBooks), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end(JSON.stringify(newBook));
			});
		});
	},

	updateBook: (req, res) => {
		const updateContent = req.body;
		const bookId = updateContent.id;

		if (!bookId) {
			res.writeHead(400);
			res.end("No ID passed");
		}

		readFile(booksDBPath, "utf-8", (err, books) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingBooks = JSON.parse(books);

			const bookIndex = existingBooks.findIndex((item) => {
				return item.id === bookId;
			});

			if (!existingBooks[bookIndex]) {
				res.writeHead(400);
				res.end("Wrong ID");
			}

			//update books object
			existingBooks[bookIndex] = {
				...existingBooks[bookIndex],
				...updateContent,
			};

			//Write updated books object to db
			writeFile(booksDBPath, JSON.stringify(existingBooks), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end(JSON.stringify(existingBooks[bookIndex]));
			});
		});
	},

	deleteBook: (req, res) => {
		const updateContent = req.body;
		const bookId = updateContent.id;

		if (!bookId) {
			res.writeHead(400);
			res.end("No ID passed");
		}

		readFile(booksDBPath, "utf-8", (err, books) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingBooks = JSON.parse(books);

			const bookIndex = existingBooks.findIndex((item) => {
				return item.id === bookId;
			});

			if (!existingBooks[bookIndex]) {
				res.writeHead(400);
				res.end("Wrong ID");
			}

			//delete book with passed id from existing books object
			existingBooks.splice(bookIndex, 1);

			writeFile(booksDBPath, JSON.stringify(existingBooks), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end("Delete successful");
			});
		});
	},
};

const authorsControllers = {
	getAllAuthors: (_, res) => {
		readFile(authorsDBPath, "utf-8", (err, authors) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}
			res.end(authors);
		});
	},

	addAuthor: (req, res) => {
		const newAuthor = req.body;

		readFile(authorsDBPath, "utf-8", (err, authors) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingAuthors = JSON.parse(authors);
			newAuthor.id = existingAuthors.length + 1;
			const allAuthors = [...existingAuthors, newAuthor];

			writeFile(authorsDBPath, JSON.stringify(allAuthors), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end(JSON.stringify(newAuthor));
			});
		});
	},

	updateAuthor: (req, res) => {
		const updateContent = req.body;
		const authorId = updateContent.id;

		if (!authorId) {
			res.writeHead(400);
			res.end("No ID passed");
		}

		readFile(authorsDBPath, "utf-8", (err, authors) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingAuthors = JSON.parse(authors);

			const bookIndex = existingAuthors.findIndex((item) => {
				return item.id === authorId;
			});

			if (!existingAuthors[bookIndex]) {
				res.writeHead(400);
				res.end("Wrong ID");
			}

			//update authors object
			existingAuthors[bookIndex] = {
				...existingAuthors[bookIndex],
				...updateContent,
			};

			//Write updated authors object to db
			writeFile(authorsDBPath, JSON.stringify(existingAuthors), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end(JSON.stringify(existingAuthors[bookIndex]));
			});
		});
	},

	deleteAuthor: (req, res) => {
		const updateContent = req.body;
		const authorId = updateContent.id;

		if (!authorId) {
			res.writeHead(400);
			res.end("No ID passed");
		}

		readFile(authorsDBPath, "utf-8", (err, authors) => {
			if (err) {
				console.error(err);
				res.writeHead(500);
				res.end("An error occured.");
			}

			const existingAuthors = JSON.parse(authors);

			const bookIndex = existingAuthors.findIndex((item) => {
				return item.id === authorId;
			});

			if (!existingAuthors[bookIndex]) {
				res.writeHead(400);
				res.end("Wrong ID");
			}

			//delete author with passed id from existing authors object
			existingAuthors.splice(bookIndex, 1);

			writeFile(authorsDBPath, JSON.stringify(existingAuthors), (err) => {
				if (err) {
					console.error(err);
					res.writeHead(500);
					res.end("An error occured.");
				}
				res.end("Delete successful");
			});
		});
	},
};

module.exports = { booksControllers, authorsControllers };
