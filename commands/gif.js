const axios = require('axios');

const gif = {
  name: 'gif',
  description: 'Zeigt einen GIF an',
  apikey:  process.env.GIPHY_TOKEN,
  url: 'https://api.giphy.com/v1/gifs/',
  limit: 1,
  execute(message, args) {
    if (args.length) {
      const requestURL = `${this.url}search?api_key=${this.apikey}&q=${
        args[0]
      }&limit=${this.limit}`;
      axios
        .get(requestURL)
        .then(response => {
          const gifurl = response.data.data[0].images.fixed_width.url;
          message.channel.send({ file: gifurl });
        })
        .catch(error => console.error(error));
    } else {
      const requestURL = `${this.url}random?api_key=${this.apikey}`;
      axios
        .get(requestURL)
        .then(response => {
          const gifurl = response.data.data.images.fixed_width.url;
          message.channel.send({ file: gifurl });
        })
        .catch(error => console.error(error));
    }
  },
};

module.exports = gif;
