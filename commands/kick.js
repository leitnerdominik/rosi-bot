module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    guildOnly: true,
    args: true,
    usage: '<@mentionuser>',
    error: false,
    execute(message) {
        const taggedUser = message.mentions.users.first();
        if(taggedUser) {
            message.channel.send(`Du willst ${taggedUser} kicken?!`);
        }
        else {
            this.error = true;
        }
    },
};