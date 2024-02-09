const http = require("http");
const path = require("path");
const { readFileSync } = require("fs");
const { booksRouter, authorsRouter } = require("./router");

const PORT = 8000;
const HOST = "";

const booksDBPath = path.join(__dirname, "db", "books.json");
let booksDB = null;

function getBodyFromStream(req) {
	return new Promise((resolve, reject) => {
		const data = [];
		req.on("data", (chunk) => {
			data.push(chunk);
		});
		req.on("end", () => {
			const body = Buffer.concat(data).toString();
			if (body) {
				// assuming that the body is a json object
				resolve(JSON.parse(body));
				return;
			}
			resolve({});
		});

		req.on("error", (err) => {
			reject(err);
		});
	});
}

async function requestHandler(req, res) {
	try {
		const body = await getBodyFromStream(req);
		req.body = body;
		res.setHeader("Content-Type", "application/json");

		if (req.url === "/books") {
			booksRouter(req, res, req.method);
		}

		if (req.url == "/books/author") {
			authorsRouter(req, res, req.method);
		}
	} catch (err) {
		res.writeHead(500);
		res.end(err.message);
	}
}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
	booksDB = JSON.parse(readFileSync(booksDBPath, "utf-8"));
	console.log(`server running at port ${PORT}`);
});
