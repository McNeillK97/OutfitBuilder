-- UP
CREATE TABLE users
(
    id INTEGER PRIMARY KEY,
    email STRING,
    name STRING,
    password STRING,
    creationID INTEGER
);

CREATE TABLE authTokens
(
    token STRING PRIMARY KEY,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE creations (
	cr8tion	INTEGER PRIMARY KEY AUTOINCREMENT,
	topID	INTEGER,
	midID	INTEGER,
	bottomID	INTEGER,
	votes	INTEGER,
	userID	INTEGER,
	FOREIGN KEY(userID) REFERENCES users(id)
);


-- Down
DROP TABLE creations;
DROP TABLE users;
DROP TABLE authTokens;