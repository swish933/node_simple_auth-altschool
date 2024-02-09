const path = require("path");
const { readFile } = require("fs");

const userDbPath = path.join(__dirname, "..", "db", "users.json");

function authenticateUser(req, res, fn) {
	let credentials = req.headers.authorization;

	if (!credentials) {
		res.writeHead(400);
		res.end(JSON.stringify({ message: "Invalid username or password" }));
		return;
	}
	credentials = credentials.split(" ")[1];
	credentials = credentials.split(":");
	let usersDb = null;

	const userCredentials = {
		username: credentials[0],
		password: credentials[1],
	};

	readFile(userDbPath, "utf-8", (err, users) => {
		if (err) throw err;
		usersDb = JSON.parse(users);

		let userFound = usersDb.find(
			(user) => user.username === userCredentials.username
		);

		if (!userFound) {
			res.writeHead(400);
			res.end(JSON.stringify({ message: "User doesn't exist. Sign up" }));
			return;
		}

		if (userFound.password !== userCredentials.password) {
			res.writeHead(400);
			res.end(JSON.stringify({ message: "Invalid username or password" }));
			return;
		}

		fn(req, res);
	});
}

module.exports = authenticateUser;
