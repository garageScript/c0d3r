# c0d3r : Discord bot for C0D3

This is the discord bot for c0d3, it performs discord related actions, like messaging in channels and dming users for the c0d3 app.

This bot can be operated by an Api documented [here](https://github.com/garageScript/c0d3r/wiki/C0D3R-Api-Documentation).

Details about the bot's design and arcitecture are available in this [design doc](https://github.com/garageScript/c0d3r/issues/3).

# Running the bot

The bot runs on the c0d3 CapRover server and can be communicated with the Api.

It can be run locally the following ways :

- ## Using yarn

1. Run `yarn` to install dependecies
2. Copy and rename `example.env` to `.env` and fill the required variables.
3. Run `yarn start` to start the bot.

- ## Using Docker

1. Run `docker build -t c0d3r .` to build the image
2. Run `docker run --env DISCORD_TOKEN=token --env BOT_TOKEN=token c0d3r` to start a new container with the bot. The env variables are required.
