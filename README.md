# hangman
## intro
This is a hangman web app built with node.js using the express framework and SQLite. It can be easily set up, includes multiple features, and has lots of potential for more to be added.

Most importantly, it allows a user to play the standard game but also allows for these settings to be changed:
* A user can pick which word categories they want from pre-made lists (customizable in the [DB setup script](./migrations-sqlite/001-initial.sql)) and user-submitted words.
* how many lives are available, they can choose between 4/8/12 lives.
* if a hint is to be displayed after half the user’s lives are used.

Another key feature of this site is the inclusion of “user-submitted words”. This allows users to submit their own words and their hints to the database (before these words are added, it goes through a checking function that ensures it’s a valid word). Players can then choose these words as a category in the settings menu.
## Setup
1. ensure you have the latest version of Node and NPM installed
2. in terminal/cmd, go to the folder where the files are installed
3. run `npm i’ to install the dependencies 
4. run `npm start` to run the site

This will start the HTTP server running on 8080, and it should work with no extra setup required.

If it worked, when you connect to the server, you should view this:
![an image of the hangman game](./readme_assets/expected-output.png)

It should be noted that this setup works on any *nix or windows enviroment provided it can support the latest version of node and NPM. 
## feature details
### Database and word managment
When the `npm start` is first run, the program will go through the [DB setup script](./migrations-sqlite/001-initial.sql) and database.sqlite will be created; this DB contains the words table with all the 49 pre-made words from the setup script. You can edit and add to this; however, you must have at least one word for each category. Each word needs an:
* ID (INT)
* a word (a string up to 45 char, must be unique. for the game to work it cannot contain symbols or numbers. Spaces are allowed)
* a hint/def (all characters allowed, must not be NULL)
* category (must be within the four categories of the game ‘random’ ‘movie’ ‘tvshow’ ‘user’, cannot be in more than one category)

### DOM layout and functions 
### game logic
### User-submitted words logic
## to-do
* fix bug where user can not choose a category and the game lets that happen but will break
* ability to exit the settings menu
* Change hangman PNG to canvas or SVG
* accessibility
  * wai-aria
  * alt tag
* update responsive styling for setting overlay
* make the enter button also the replay button
* Finnish readme
## future features
* multiplayer
* server-side letter checking
* admin page with the ability to manage words and categories


