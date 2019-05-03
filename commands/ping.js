module.exports = {
  name: 'ping',
  description: 'Ping!',
  cooldown: 5,
  execute(message) {
    const start = process.hrtime();
    const p = new Promise((resolve, reject) => {
      resolve('Pong!');
    }).then(() => {
      const diff = process.hrtime(start);
      message.channel.send(`${diff[0]}s ${diff[1] / 1e6}ms`);
    });

    // p.then()
    // message.channel.send(process.hrtime());
  },
};
