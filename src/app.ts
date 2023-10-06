import { IntentsBitField, REST, Routes } from 'discord.js';
import Client from './client';
import * as util from 'util';
import { ucFirst } from './util/UtilStr';
import LoadFileService from './service/LoadFileService';
import { APP_DIR } from './config/Constant';
import { ENodeEnv } from './enum/ENodeEnv';

void (async () => {
  const client = new Client<false>({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ],
    prefixes: ['l!', 'lulu'],
    development: process.env.NODE_ENV === ENodeEnv.DEVELOPMENT
  });

  for (const dir of ['event', 'command']) {
    console.log('\n------------------------------');
    console.log(util.format('Loading %s folder', ucFirst(dir)));
    console.log('------------------------------');
    const loadFileService = new LoadFileService(client);
    await loadFileService.searchInFolder(util.format('%s/%s', APP_DIR, dir));
  }

  // await client.login(process.env.DISCORD_TOKEN);

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('701112722284216330'), {
      body: client.application_commands
    });

    console.log('Successfully reloaded application (/) commands.');

    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error(error);
  }
})();

process.on('unhandledRejection', (reason: Error, promise) => {
  console.log('Unhandled Rejection at:', reason.stack != null || reason);
  console.log('Promise:', promise);
});

process.on('uncaughtException', (err: Error) => {
  console.log('Uncaught Exception:', err.stack != null || err);
});
