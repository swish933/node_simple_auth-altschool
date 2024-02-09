const { booksControllers, authorsControllers } = require("./controllers");
const authenticateUser = require("./middleware/auth");

const booksRouter = (req, res, method) => {
	switch (method) {
		case "GET":
			booksControllers.getAllBooks(req, res);
			break;

		case "POST":
			authenticateUser(req, res, booksControllers.addBook);
			break;

		case "PUT":
			authenticateUser(req, res, booksControllers.updateBook);
			break;

		case "DELETE":
			authenticateUser(req, res, booksControllers.deleteBook);
			break;

		default:
			res.writeHead(404);
			res.write(
				JSON.stringify({
					message: "Method Not Supported",
				})
			);
			res.end();
	}
};

const authorsRouter = (req, res, method) => {
	switch (method) {
		case "GET":
			return authorsControllers.getAllAuthors(req, res);

		case "POST":
			authenticateUser(req, res, authorsControllers.addAuthor);

		case "PUT":
			authenticateUser(req, res, authorsControllers.updateAuthor);

		case "DELETE":
			authenticateUser(req, res, authorsControllers.deleteAuthor);

		default:
			res.writeHead(404);
			res.write(
				JSON.stringify({
					message: "Method Not Supported",
				})
			);
			res.end();
	}
};

module.exports = { booksRouter, authorsRouter };
