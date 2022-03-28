--up

CREATE TABLE words(
    id VARCHAR(36) PRIMARY KEY,
    word VARCHAR(45) UNIQUE NOT NULL,
    def TEXT not null,
    category varchar(10)
);

INSERT INTO words(id, word, def, category) VALUES
    (1, 'test', 'def of the word test', 'testCat'),
    (2, 'cheese', 'something tasty', 'random'),
    (3, 'news', 'recent events and information.', 'random'),
    (4, 'formal', 'done in accordance with convention or etiquette; suitable for or constituting an official or important occasion.', 'random'),
    (5, 'manage', 'be in charge of.', 'random'),
    (6, 'depart', 'leave, especially in order to start a journey.', 'random'),
    (7, 'ridge', 'a long, narrow hilltop, mountain range, or watershed.', 'random'),
    (8, 'content', 'in a state of peaceful happiness.', 'random'),
    (9, 'fragment', 'occurring or done many times at short intervals.', 'random'),
    (10, 'integrity', 'the quality of being honest and having strong moral principles.', 'random'),
    (11, 'humans', 'what you are.', 'random'),
    (12, 'jazz', 'A music style.', 'random'),
    (13, 'hangman', 'A game', 'random'),
    (14, 'confuse', 'make (someone) bewildered or perplexed.', 'random'),
    (15, 'sunrise', 'a time in the morning.', 'random'),
    (16, 'definite', 'clearly stated or decided; not vague or doubtful.', 'random'),
    (17, 'requirement', 'a thing that is needed or wanted.', 'random'),

    (18, 'Star Wars', 'an old movie', 'movie'),
    (19, 'lord of the rings', 'movie about a ring', 'movie'),
    (20, 'lord of the flies', 'a kids movie', 'movie'),
    (21, 'lord of the dance', 'an Irish movie', 'movie'),
    (22, 'jurassic park', 'A dinosaur movie', 'movie'),
    (23, 'mission imposible', 'spys', 'movie'),
    (24, 'groundhog day', 'time loop', 'movie'),
    (25, 'shrek', 'green onion', 'movie'),
    (26, 'harry potter', 'wizards', 'movie'),
    (27, 'how to train your dragon', 'dragons', 'movie'),
    (28, 'inception', 'dreams', 'movie'),
    (29, 'the matrix', 'simulation', 'movie'),
    (30, 'john wick', 'gun-fu', 'movie'),
    (31, 'back to the future', 'time travel', 'movie'),
    (32, 'cast away', 'lost on an island', 'movie'),
    (33, 'labyrinth', 'a maze', 'movie'),
    (34, 'shaun of the dead', 'zombies cornetto', 'movie'),
    (35, 'hot fuzz', 'police cornetto', 'movie'),
    (36, 'worlds end', 'pubs cornetto', 'movie'),
    (37, 'bee movie', 'bees with humans', 'movie'),

    (38, 'the A team', 'a team', 'tvshow'),
    (39, 'the IT crowd', 'a IT team', 'tvshow'),
    (40, 'strange things', 'upside down', 'tvshow'),
    (41, 'friends', 'people who will be there for you when the rain starts to fall', 'tvshow'),
    (42, 'the mandalorian', 'space bounty hunter', 'tvshow'),
    (43, 'community', '6 seasons and a movie', 'tvshow'),
    (44, 'dirk gentlys holistic detective agency', 'everthing is connected', 'tvshow'),
    (45, 'queens gambit', 'chess', 'tvshow'),
    (46, 'star trek', 'picard or kirk', 'tvshow'),
    (47, 'the office', 'the best boss', 'tvshow'),
    (48, 'brooklyn nine nine', 'NINE! NINE!', 'tvshow'),

    (49, 'first', 'the first user submitted word', 'user');

--down

-- DROP TABLE IF EXISTS words;