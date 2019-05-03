module.exports = {
  name: 'random',
  aliases: ['rng', 'zufällig'],
  description: 'Zufallsgenerator',
  usage: '[<n1> <n2>]',
  example: [
    '-> gibt eine zufällige Zahl zwischen 0 und 100 aus',
    '277 -> zufällige Zahl zwischen 0 und 277',
    '3 37 -> zufällige Zahl zwischen 3 und 37',
  ],
  error: false,
  errorMessage: '',
  execute(message, args) {
    let rndNum = null;
    if (!args.length) rndNum = this.getRandomNumber(0, 100);
    else if (args.length === 1) rndNum = this.getRandomNumber(0, args[0]);
    else if (args.length === 2) rndNum = this.getRandomNumber(args[0], args[1]);

    return message.channel.send(`${rndNum}`);
  },

  getRandomNumber(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    if (!isNaN(min) && !isNaN(max)) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.error = true;
    this.errorMessage = 'Ich akzeptiere keine Dezimalzahlen!';
  },
};
