This is a Node.js adaptation of GoldDigger, a gaming server/map visualizer.

### Introduction
 In a not too distant future, resources on earth has gotten very scarce and the demand for certain minerals has made their price skyrocket. All mineral trades are controlled by either government or a few mega corporations that got their licenses to trade and mine back in the early 21st century when people still believed in patents, licensing and certifications.

 But now a sliver of hope has appeared appeared at the horizon as your team has recently made significant progress in the field of fast space travel combined with advanced remote communication. You are now on the verge of being able to send small mineral collecting spaceships and maybe this is the chance everybody has been waiting for. Is this the chance to restore a free market and also restore the power balance once again as everyone who dares to explore the interstellar mineral minefields can engage in mining and trading.
 
---

 You can barely wait because soon the first batch you of ships you sent out, complete with collecting probes, also known as mineral diggers or diggers will reach their destination. 

Information now reaches you and tells you that 3 out of the four ships you sent out has either gone missing or crashed. But you suspect it has been 'confiscated'.

 Your hope now lies with the only spaceship that is still under your control, which landed approximately 15 minutes ago. The uplink test indicates that the communication works and the ship is probably awaiting your first commands. According to the landing log it is located in a small cave, hoovering on top of the mineral drop zone. 

Be careful, despite the diggers sturdy constructions you stand no chance to quick recovery if a digger gets lost in the vast caves. 

And remember, she who controls the minerals, controls the universe!

Good luck.


## Goal of the game

The primary goal of the game is to collect as much minerals as you possibly can during a predetermined period of time. This is best done using the REST-like API that the server provides. The API documentation is found and the end of this README.

We recommend 1-3 hours of play.

## Getting started

The 'client' used to visualize the game is configured for up to 4 different simultanious competitors. But the server hasn't been 'load tested'. It is however possible to add an arbitraty number of clients to the 'players' file, allowing for a lot of simultanious player on the same node.js instance.

# Pre-reqs
To run your own server you need:
- Node.js (http://nodejs.org/)
- NPM (http://npmjs.org/)
- Faye (http://faye.jcoglan.com/)

# Configuration
- Take a look at the file '<path to nodedigger>/server/players'-dir. It consists of rows with tuples: BotName + password. 

The server is tested with bot names that contain no spaces and only small or large letters. Good names can be found in the players file. Bad names include: L33tZûrz €€==> or '._. <= The Whale Lives III' or the untested '%¤-¤%'.

If you want the server to run on specific ports you need to edit nodedigger.js and the visualizer, if you're planning on using that.

# Starting the game

- Start the server: node nodedigger.js
- Launch browser, and open file: <<nodediggerdir>>/clients/world/map.html
- Let the players connect and start collecting minerals

## API

The communication with the server done by using HTTP-requests.

To send a command, you simply post a request as follows:
http://127.0.0.1/botname/pwd/command

The possible commands are: 
*   north
*   east
*   south
*   west
*   look
*   grab
*   drop
*   next

Each command results in a respons. Either 'OK' or 'Not OK'. 'Not OK' is used whenever there is a problem, i.e wrong botname, password or some other unrecoverable 'unknown' error. 

Under normal conditions 'OK' are sent by all commands except for look, which returns a small map of 3x3 chars.

# The look command:

When you start and perform the look command it will typically result in a response like this:

    www
    wb.
    w..

'w' means wall and 'b' means 'bank' and whenever you enter a new map the bot always starts at the bank.

When you've walked around for a bit and look around, it might look like this:

    ...
    w.7
    ...

The center is always the bot position and any number indicates the amount of minerals on the ground. 7 for example, as shown in this example:

It is not possible to walk through walls, obviously, and minerals can vary from 1 through 9.

# The 'next' command

Next can only be used when the current map is emptied from minerals, i.e the land is completely drained. 

# Directions commands

North, east, west and south moves the bot around. Hitting walls just results in an 'OK' response and the bot not moving.