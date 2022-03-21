--up

CREATE TABLE words(
    id VARCHAR(36) PRIMARY KEY,
    word VARCHAR(45) UNIQUE NOT NULL,
    def TEXT not null,
    category varchar(10)
);

INSERT INTO words(id, word, def, category) VALUES(
    1, 'test', 'def of the word test', 'testCat'
)

--down

-- DROP TABLE IF EXISTS words;