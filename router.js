const { booksControllers, authorsControllers } = require("./controllers");
const authenticateUser = require("./middleware/auth");

const booksRouter = (req, res, method) => {
	switch (method) {
		case "GET":
			booksControllers.getAllBooks(req, res);
			break;

		case "POST":
			authenticateUser(req, res)
				.then(() => booksControllers.addBook(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});
			break;

		case "PUT":
			authenticateUser(req, res)
				.then(() => booksControllers.updateBook(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});

			break;

		case "DELETE":
			authenticateUser(req, res)
				.then(() => booksControllers.deleteBook(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});
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
			authenticateUser(req, res)
				.then(() => authorsControllers.addAuthor(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});
			break;

		case "PUT":
			authenticateUser(req, res)
				.then(() => authorsControllers.updateAuthor(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});
			break;

		case "DELETE":
			authenticateUser(req, res)
				.then(() => authorsControllers.deleteAuthor(req, res))
				.catch((err) => {
					res.writeHead(400);
					res.end(err);
				});
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

module.exports = { booksRouter, authorsRouter };
