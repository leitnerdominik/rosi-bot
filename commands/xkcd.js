const axios = require('axios');

const cheerio = require('cheerio');

module.exports = {
  name: 'xkcd',
  description: 'Zeigt den letzten random XKCD Comic',
  aliases: ['comic'],
  cooldown: 5,
  apiUrl: 'http://xkcd.com/info.0.json',
  rndUrl: 'https://c.xkcd.com/random/comic/',
  execute(message) {
    axios
      .get(this.rndUrl)
      .then(response => {
        const htmlData = cheerio.load(response.data);
        // const comic = `https:${htmlData('#comic')}`;
        const img = `https:${htmlData('#comic')
          .find('img')
          .first()
          .attr('src')}`;
        const title = `${htmlData('#comic')
          .find('img')
          .first()
          .attr('title')}`;
        message.channel.send(title, {
          file: img,
        });
      })
      .catch(error => {
        console.log(error);
        message.channel.send('Etwas ist schief gelaufen :(');
      });
  },
};
