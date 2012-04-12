This is a Node.js adaptation of GoldDigger, a gaming server/map visualizer.

### Introduction
 In a not too distant future, resources on earth has gotten very scarce and the demand for certain minerals has made their price skyrocket. All mineral trades are controlled by either government or a few mega corporations that got their licenses to trade and mine back in the early 21st century when people still believed in patents, licensing and certifications.

 But now a sliver of hope has appeared appeared at the horizon as your team has recently made significant progress in the field of fast space travel combined with advanced remote communication. You are now on the verge of being able to send small mineral collecting spaceships and maybe this is the chance everybody has been waiting for. Is this the chance to restore a free market and also restore the power balance once again as everyone who dares to explore the interstellar mineral minefields can engage in mining and trading.
 
---

 The first batch you of ships you sent out, complete with collecting probes, also known as diggers has probably reached their destination by now. A quick log scan tells you that this might be the case but a closer look reveals that three of the four ships you sent out has either gone missing or crashed. You suspect foul play or have they been 'confiscated' by the government.

 Your hope now lies with the only spaceship that is still under your control, which landed approximately 15 minutes ago according to the space log. The uplink tests indicates that the communication works and the ship is probably awaiting your first commands. According to the space ships landing log it is located in a small cave, hoovering on top of the mineral drop zone.

Be careful, despite the diggers sturdy constructions you stand no chance to quick recovery if a digger gets lost in the vast caves. 

And remember, she who controls the minerals, controls the universe!

Good luck.


## Goal of the game

The primary goal of the game is to collect as much minerals as you possibly can during a predetermined period of time. This is best done using the REST-like API that the server provides. The API documentation is found and the end of this README.

We recommend 1-3 hours of play.

## Getting started (admins only)

The 'client' used to visualize the game is configured for up to 4 different simultanious competitors. But the server hasn't been 'load tested'. It is however possible to add an arbitraty number of clients to the 'players' file, allowing for a lot of simultanious player on the same node.js instance.

# Pre-reqs

To run your own server you need:

-   Node.js (http://nodejs.org/)
-   NPM (http://npmjs.org/)
-   Faye (http://faye.jcoglan.com/)

# Configuration

Take a look at the file '<path to nodedigger>/server/players'-dir. It consists of rows with pair: BotName:password. 

The server is tested with bot names that contain no spaces and only small or large letters. Good names can be found in the players file. 

Untested (bad) names include: 

*   '€€ L33tZûrz €€'
*   ._. <= the whale Lives 
*   or the equally untested '>¤.¤<', a.k.a 'kosmos katten'

If you want the server to run on specific ports you need to edit nodedigger.js and the visualizer, if you're planning on using the pre packaged HTML-visualizer.

# Starting the game

- Start the server: node nodedigger.js
- Launch browser, and open file: <<nodediggerdir>>/clients/world/map.html
- Let the players connect and start collecting minerals

## API (for players)

The communication with the server done by using HTTP-requests.

To send a command, you simply post a request as follows:
http://server.ip.address/YourBotName/YourPassword/your_command

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

Under normal conditions 'OK' are sent by all commands except for look, which returns a small map of 3x3 chars. And 'next' which only returns 'OK' if you've traveled to the next mineral field (changed map).

# The look command:

When you start and perform the look command it will typically result in a response like this:

    www
    wb.
    w..

'w' means wall and 'b' stands for 'bank' (the drop zone) and whenever you enter a new map the bot always starts there, at the bank. Yep, you got it. The map is a matrix.

When you've walked around for a bit and look around, it might look like this:

    ...
    w.7
    ...

The center is always the bot position and any number indicates the amount of minerals on the ground. 7 for example, as shown in this example. If you move east you can use the grab command. If you then perform look, you can see that the amount of minerals has been reduced to 6.

It is not possible to walk through walls, obviously, there has to been some level of realism? Right?

Minerals can vary from 1 through 9 and when there are no minerals present, a dot . is shown. 

# Directions commands

North, east, west and south moves the bot around. Hitting walls just results in an 'OK' response and the bot not moving.

# The 'next' command

Next is used to travel to the next mineral field, i.e change map. It can only be used when the current map is cleared from minerals and every piece that is carried is dropped in the drop zone. Which is locate at position 1,1 on every map.

# The 'grab' command

Grab picks up one mineral unit, if there is one on the ground, and puts it in the diggers mineral compartment.  This unit is carried around until it is dropped. See drop. The default limit on how much a digger can carry is three (3 units), this is however very easy to change in the server so. If the grab command is executed while the limit is reached, or there is nothing on the ground, nothing happens. To drop something on the ground or place it in the drop zone, use the drop command.

# The 'drop' command

Dropping minerals from you inventory is done with the drop command. If you are carrying nothing, nothing happens. If you are carrying minerals, they are dropped on the ground. 

If the digger is at the dropzone, or the 'bank', a point is scored for each unit dropped and the load is reduced with one unit. This is the only way to  earn points. If there are more than nine (9 units) of minerals on the ground, no more minerals can be dropped at that location.

# The 'Drop Zone'

The drop zone, or bank, is located at position 1,1 on every map. This is also where the digger starts when arriving at a new mineral field. For instance when the game starts or the 'next' command has executed properly.
