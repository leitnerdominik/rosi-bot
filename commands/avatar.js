module.exports = {
  name: 'avatar',
  description: `Zeigt den Avatar eines Spieler's an`,
  cooldown: 5,
  usage: '[<user1> <user2> usw.]',
  aliases: ['icon', 'pfp'],
  execute(message) {
    if (!message.mentions.users.size) {
      message.channel.send(`Your Avatar: ${message.author.displayAvatarURL}`);
    } else {
      const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s Avatar: ${user.displayAvatarURL}`;
      });

      message.channel.send(avatarList);
    }
  },
};
