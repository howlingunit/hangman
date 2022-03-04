--up

CREATE TABLE words(
    id VARCHAR(36) PRIMARY KEY,
    word VARCHAR(45) UNIQUE NOT NULL,
    def TEXT not null,
    category varchar(10)
);

--down

DROP TABLE words;