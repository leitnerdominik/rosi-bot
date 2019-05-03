const { RichEmbed } = require('discord.js');

const { PREFIX } = process.env;

module.exports = {
  name: 'help',
  description: 'zeigt alle Befehle an',
  aliases: ['commands', 'hilfe'],
  usage: '[command name]',
  cooldown: 1,
  error: false,
  errorMessage: '',
  execute(message, args) {
    const { commands } = message.client;

    if (!args.length) {
      const helpEmbed = new RichEmbed();
      helpEmbed
        .setColor('#0099ff')
        .setTitle('Befehle')
        .setDescription(
          `Hier eine Liste aller Befehle:\n
          Sende \`${PREFIX}help [command name]\` um genauere Info's zu erhalten.`,
        )
        .addBlankField();
      commands.forEach(command => {
        helpEmbed.addField(`${PREFIX}${command.name}`, command.description);
      });
      // data.push('Hier ist eine Liste aller Befehle:');
      // data.push(
      //   commands
      //     .map(command => {
      //       return `\`${command.name} - ${command.description}\``;
      //     })
      //     .join('\n'),
      // );
      // data.push(
      //   `\nSende \`${prefix}help [command name]\` um genauere Info's zu erhalten.`,
      // );

      return message.channel.send(helpEmbed);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      this.error = true;
      this.errorMessage = `Den Befehl \`${name}\` gibt es nicht!`;
      return;
    }

    const commandHelpEmbed = new RichEmbed();
    commandHelpEmbed
      .setColor('#0099ff')
      .setTitle(`Befehl: ${prefix}${command.name}`);
    if (command.aliases) {
      commandHelpEmbed.addField('Aliases', command.aliases.join(', '));
    }
    if (command.description) {
      commandHelpEmbed.setDescription(command.description);
    }
    if (command.usage) {
      commandHelpEmbed.addField(
        'Benutzung',
        `\`${prefix}${command.name} ${command.usage}\``,
      );
    } else {
      commandHelpEmbed.addField('Benutzung', `\`${prefix}${command.name}\``);
    }

    if (command.permissions) {
      commandHelpEmbed.addField(
        'Benötigte Berechtigungen',
        command.permissions.join('\n'),
      );
    }

    if (command.example) {
      const examples = command.example.map((item, index) => {
        return `\`${index + 1}. ${prefix}${command.name} ${item}\``;
      });
      commandHelpEmbed.addField('Beispiel', examples.join('\n'));
    }

    commandHelpEmbed.addField(
      'Abklingzeit',
      `${command.cooldown || 3} Sekunde(n)`,
    );

    // data.push(`**Befehl:** ${command.name}`);
    // if (command.aliases)
    //   data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    // if (command.description)
    //   data.push(`**Beschreibung:** ${command.description}`);
    // if (command.usage) {
    //   data.push(`**Benutzung:** \`${prefix}${command.name} ${command.usage}\``);
    // } else {
    //   data.push(`**Benutzung:** \`${prefix}${command.name}\``);
    // }
    // if (command.example) {
    //   const examples = command.example.map((item, index) => {
    //     return `\`${index + 1}. ${prefix}${command.name} ${item}\``;
    //   });
    //   data.push(`**Beispiel:** \n${examples.join('\n')}`);
    // }

    // data.push(`**Abklingzeit:** ${command.cooldown || 3} Sekunde(n)`);

    message.channel.send(commandHelpEmbed);
  },
};
