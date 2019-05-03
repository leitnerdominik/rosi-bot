const fs = require('fs');

const Discord = require('discord.js');

const { PREFIX, DISCORD_TOKEN } = process.env;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Ready');
});

client.on('guildMemberAdd', member => {
  member.guild.channels
    .get('welcome')
    .send(`Willkommen ${member.user.username}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const { channel } = message;
  console.log(message.author.lastMessage.member.roles);

  // if(!client.commands.has(commandName)) return;

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName),
    );

  if (!command) return;

  if (command.permissions) {
    const { roles } = message.author.lastMessage.member;
    const hasPermission = command.permissions.every(permission =>
      roles.some(role => role.name === permission),
    );

    if (!hasPermission) {
      return message.reply('Du hast keine Rechte um den Befehl zu benutzen!');
    }
  }

  if (command.args && !args.length) {
    let reply = `Du hast keine Argumente angegeben, ${message.author}!`;

    if (command.usage) {
      reply += `\nDie richtige Verwendung waere: \`${PREFIX}${command.name} ${
        command.usage
      }\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (expirationTime > now) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `bitte warte noch ${timeLeft.toFixed(
          1,
        )} Sekunde(n) vor der Wiederverwendung des Befehls \`${
          command.name
        }\`.`,
      );
    }
  }

  try {
    command.execute(message, args, channel);
    if (command.error) {
      let reply = '';
      if (command.errorMessage) {
        reply = command.errorMessage;
      } else {
        reply = 'Syntax fehler!';
        reply += `\nDie richtige Verwendung waere: \`${PREFIX}${command.name} ${
          command.usage
        }\``;
      }
      command.error = false;
      return message.channel.send(reply);
    }
  } catch (error) {
    console.error(error);
    message.reply('something went wrong :(');
  }
});

client.login(DISCORD_TOKEN);
