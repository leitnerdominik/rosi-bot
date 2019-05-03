module.exports = {
  name: 'clear',
  aliases: ['cls'],
  description: 'Löscht die letzten N Posts. \n Default: 10',
  usage: '[<Anzahl der Beiträge>]',
  permissions: ['Toaster'],
  error: false,
  async execute(message, args, channel) {
    let deleteCount = 10;
    if (args.length) {
      deleteCount = args[0];
    }

    try {
      const messages = await channel.fetchMessages({ limit: deleteCount });
      const messagesArr = messages.array();
      messagesArr.forEach(async msg => {
        await msg.delete();
      });
      message.channel.send(`${messagesArr.length} Post(s) gelöscht!`);
    } catch (error) {
      this.error = true;
      console.log(error);
    }
  },
};
