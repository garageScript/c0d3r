# c0d3r : Discord bot for C0D3

This is the discord bot for c0d3, it performs discord related actions, like messaging in channels and dming users for the c0d3 app.

This bot can be operated by an Api documented [here](https://github.com/garageScript/c0d3r/wiki/C0D3R-Api-Documentation).

Details about the bot's design and arcitecture are available in this [design doc](https://github.com/garageScript/c0d3r/issues/3).

# Running the bot

The production bot runs on the c0d3 CapRover server and can be communicated with the Api.

## Development - Getting Started

\* First you need to register a discord application to get the `DISCORD_TOKEN` that c0d3r will use to forward your commands to your discord server. A guide for that setup can be found on the wiki page here: [Registering a Discord Bot](https://github.com/garageScript/c0d3r/wiki/Registering-a-Discord-Bot#registering-a-discord-bot)
- ## Using yarn

1. Run `yarn` to install dependecies
2. Copy and rename `example.env` to `.env` and fill the required variables.
3. Run `yarn start` to start the bot.

- ## Using Docker

1. Run `docker build -t c0d3r .` to build the image
2. Run `docker run --env DISCORD_TOKEN=token --env BOT_TOKEN=token c0d3r` to start a new container with the bot. The env variables are required.

---
Notes

- The production `DISCORD_TOKEN` available to the engineering team should not be used for local development as the `c0d3` discord server will end up receiving your test messages.
- For testing your `BOT_TOKEN` can be any value as long as the application sending the api commands has the same `Authorization` header token set `Bearer <BOT_TOKEN>`

### Confirm setup

You should be able to run this `curl` command to verify your c0d3r bot is running correctly

```bash
curl --location --request POST 'http://localhost:5623/api/senddirectmessage' \
--header 'Authorization: Bearer <BOT_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "<USER_ID>",
    "message": "Good Job! You are ready to c0d3"
  }'
```

\* replace `<BOT_TOKEN>` & `<USER_ID>` with their correct corresponding value.

(Enable [developer mode in discord](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to get channelId's / userId's )