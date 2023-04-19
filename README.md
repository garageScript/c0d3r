# c0d3r : Discord bot for C0D3

This is the discord bot for c0d3, it performs discord related actions, like messaging in channels and direct messaging users for the c0d3 app.

This bot can be operated by an Api documented [here](https://github.com/garageScript/c0d3r/wiki/C0D3R-Api-Documentation).

Details about the bot's design and architecture are available in this [design doc](https://github.com/garageScript/c0d3r/issues/3).

# Running the bot

The production bot runs on the c0d3 CapRover server and can be communicated with the Api.

## Development - Getting Started

First you need to register a discord application to get the `BOT_TOKEN` that c0d3r will use to forward your commands to your discord server. A guide for that setup can be found on the wiki page here: [Registering a Discord Bot](https://github.com/garageScript/c0d3r/wiki/Registering-a-Discord-Bot#registering-a-discord-bot)

## Setting the .env variables

Copy and rename `example.env` to `.env` and fill the required variables below

`DISCORD_TOKEN`: to find your Discord token, you can [follow these instructions](https://www.androidauthority.com/get-discord-token-3149920/).

`BOT_TOKEN`: Ensure you have followed the above instructions for registering the application/bot.

- Go to the [Discord developer portal](https://discord.com/developers/applications)
- Click on your application/bot
- Go to the Bot tab, and click the "Reset Token" button and copy the token.

`CLIENT_ID`:

- Go to the [Discord developer portal](https://discord.com/developers/applications)
- Click on your application/bot
- Go to the OAuth2 tab, and you will find the `CLIENT_ID` under "Client information"

`GRAPHQL_API`: This should be `http://localhost:3000/api/graphql` when running locally.

`GUILD_ID`: First enable discord developer mode:

- Click the gear icon in the bottom-left of the Discord app to open User Settings
- Click the App Settings > Advanced tab
- Turn on Developer Mode
- Exit out of User Settings
- Right-click on the server in which you will be testing the bot
- Click the "Copy Server ID" button

`OPENAI_API_KEY`: Get this from the c0d3-app engineering team.

---

## Using yarn to start the bot

1. Run `yarn` to install dependencies
2. Ensure that all `.env` variables have been set per the instructions above
3. Run `yarn start` to start the bot.

## Using Docker to start the bot

1. Run `docker build -t c0d3r .` to build the image
2. Run `docker run --env DISCORD_TOKEN=token --env BOT_TOKEN=token c0d3r` to start a new container with the bot. The env variables are required.

---

Notes

- The production `DISCORD_TOKEN` available to the engineering team should not be used for local development as the `c0d3` discord server will end up receiving your test messages.
- For testing your `BOT_TOKEN` can be any value as long as the application sending the api commands has the same `Authorization` header token set `Bearer <BOT_TOKEN>`

### Confirm setup

You should be able to run this `curl` command to verify your c0d3r bot is running correctly

```bash
curl --location --request POST 'http://localhost:5623/api/messages/direct/<USER_ID>' \
--header 'Authorization: Bearer <BOT_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Good Job! You are ready to c0d3"
  }'
```

\* replace `<BOT_TOKEN>` & `<USER_ID>` with their correct corresponding value.

(Enable [developer mode in discord](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to get channelId's / userId's )
