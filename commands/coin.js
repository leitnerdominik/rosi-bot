const Coin = {
  name: 'flip',
  aliases: ['coin', 'münze'],
  description: 'Wirft eine Münze',
  sides: {
    heads:
      'https://cdn.discordapp.com/attachments/348445862302711810/459448222281236483/unknown.png',
    tails:
      'https://cdn.discordapp.com/attachments/348445862302711810/459449777239883777/unknown.png',
  },

  execute(message) {
    const sideKeys = Object.keys(this.sides);
    const ObjIndex = (sideKeys.length * Math.random()) << 0;
    const rndSide = this.sides[sideKeys[ObjIndex]];

    message.channel.send({
      file: rndSide,
    });
  },
};

module.exports = Coin;
