const path = require("path");
const { readFile } = require("fs");

const userDbPath = path.join(__dirname, "..", "db", "users.json");

function authenticateUser(req, res, fn) {
	return new Promise((resolve, reject) => {
		let credentials = req.headers.authorization;

		if (!credentials) {
			reject("Invalid username or password");
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
			if (err) reject(err);
			usersDb = JSON.parse(users);

			let userFound = usersDb.find(
				(user) => user.username === userCredentials.username
			);

			if (!userFound) {
				reject("User doesn't exist. Sign up");
				return;
			}

			if (userFound.password !== userCredentials.password) {
				reject("Invalid username or password");
				return;
			}

			resolve();
		});
	});
}

module.exports = authenticateUser;
