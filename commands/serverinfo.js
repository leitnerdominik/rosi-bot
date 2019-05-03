const ServerInfo = {
  name: 'serverinfo',
  description: 'zeigt Informationen über den Server an',
  execute(message) {
    const server = message.guild;

    let serverRoles = server.roles.map(role => `* ${role.name}`);

    // remove everyone role
    serverRoles = serverRoles.filter(role => role !== '* @everyone');

    const emojis = server.emojis.map(emoji => emoji.toString()).join(' ');

    const embedObj = {
      color: 3447003,
      author: {
        name: 'Serverinfo',
        icon_url: server.iconURL,
      },
      fields: [
        {
          name: 'Name',
          value: server.name,
          inline: true,
        },
        {
          name: 'Region',
          value: server.region,
          inline: true,
        },
        {
          name: 'Besitzer',
          value: server.owner.user.username,
          inline: true,
        },
        {
          name: 'Rollen',
          value: serverRoles.join('\n'),
          inline: true,
        },
        {
          name: 'Mitglieder',
          value: server.memberCount,
          inline: true,
        },
        {
          name: 'Erstellt',
          value: new Date(server.createdAt).toDateString(),
          inline: true,
        },
        {
          name: 'AFK timeout',
          value: `${server.afkTimeout / 60} Minuten`,
          inline: true,
        },
        {
          name: 'Emojis',
          value: emojis,
          inline: true,
        },
      ],
    };

    message.channel.send({ embed: embedObj });
  },
};

module.exports = ServerInfo;
