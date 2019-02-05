const functions = require('firebase-functions');

const { Translate } = require('@google-cloud/translate');

const Config = require('./config.js');

// Your Google Cloud Platform project ID
const projectId = Config.projectId;

// Instantiates a client
const translate = new Translate({
  projectId: projectId
});

exports.translate = functions.https.onRequest((request, response) => {
  const text = request.query['text'];
  const target = 'ja';

  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      console.dir(results);
      console.log(JSON.stringify(results));
      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);

      return response.send(`${text}: ${translation}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});
