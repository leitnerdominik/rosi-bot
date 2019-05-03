const UserInfo = {
  name: 'userinfo',
  description: 'Gibt Informationen eines Benutzers aus.',
  usage: '[<user1> <user2> etc.]',
  execute(message) {
    let userInfo;
    if (!message.mentions.users.size) {
      userInfo = this.getUserData(message.author);
      return message.channel.send({ embed: userInfo });
    } else {
      userInfo = message.mentions.users.map(user => {
        return this.getUserData(user);
      });

      userInfo.forEach(item => {
        message.channel.send({ embed: item });
      });
    }
    // message.channel.send({ embed: userInfo });
  },
  getUserData(user) {
    const embedObj = {
      author: {
        name: user.username,
        icon_url: user.avatarURL,
      },
      fields: [
        {
          name: 'Status',
          value: user.presence.status,
        },
        {
          name: 'Registriert',
          value: new Date(user.createdAt).toDateString(),
        },
      ],
    };

    user.presence.game
      ? embedObj.fields.push({
          name: 'Spielt',
          value: user.presence.game.name,
        })
      : null;

    return embedObj;
  },
};
module.exports = UserInfo;
