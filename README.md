# Super Mario Frogger game
This a reproduction of the 80's frogger game with a Super Mario Bros flavor.

![screenshot of the super mario frogger game][splash]
![screenshot of the super mario frogger game][game]

[splash]: /src/images/screenshot-splash.jpg "splash sceen the super mario frogger game"
[game]: /src/images/screenshot-game.jpg "game sceen the super mario frogger game"

## Installation

1. Clone the repository using the command:

`$ git clone https://github.com/zakhttp/super-mario-frogger.git`

2. Install NPM & Bower dependencies using the commands:

`$ npm install && $ bower install`

3. Run the following command to build the game and serve it in the browser

`$ gulp serve`

### How to Play

Use the keyboard arrow up/down/left/right to move Mario around the game bridges.

You should collect as many coins as possible while trying to make it to the top bridge.

Be careful Goombas are nasty, try to avoid them!

The game engine is contained within [the engine ](https://github.com/zakhttp/super-mario-frogger/blob/super-mario/js/engine.js) file, it can be used as a standalone game loop for different game ideas.

The project uses an image loading and caching utility that can be found in [resources.js ](https://github.com/zakhttp/super-mario-frogger/blob/super-mario/js/resources.js) .

Please feel free to use it in case you find it useful in any of your projects, don't forget to star the repository.

Cheers!
