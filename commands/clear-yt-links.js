module.exports = {
  name: 'clear-yt-links',
  aliases: ['clsyt', 'cls-yt', 'clearyt', 'deleteyt', 'clear-yt', 'delete-yt'],
  description: 'Löscht die letzten N YT-Links in einem Channel \n Default: 10',
  usage: '[<Anzahl der Beiträge>]',
  permissions: ['Toaster'],
  error: false,
  async execute(message, args, channel) {
    let deleteCount = 10;
    if (args.length) {
      deleteCount = args[0];
    }
    const ytRegex = /^(.*)(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?(.*)$/;
    try {
      const messages = await channel.fetchMessages({ limit: deleteCount });
      message.channel.send(
        `Suche nach YouTube Links in den letzten ${deleteCount} Posts...`,
      );
      const ytLinks = messages.filter(msg => {
        return (
          ytRegex.test(msg.content) ||
          (msg.author.username === 'Rythm' && msg.author.bot)
        );
      });

      const ytLinksArr = ytLinks.array();
      if (!ytLinksArr.length) {
        return message.reply(
          `Konnte keine YouTube Links in den letzten ${deleteCount} Posts finden!`,
        );
      }
      ytLinksArr.forEach(async msg => {
        await msg.delete();
      });
      message.channel.send(`${ytLinksArr.length} YouTube Links gelöscht!`);
    } catch (error) {
      this.error = true;
      console.log(error);
    }
  },
};
