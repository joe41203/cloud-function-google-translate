const functions = require('firebase-functions');

const { Translate } = require('@google-cloud/translate');

const Config = require('./config.js');

// Your Google Cloud Platform project ID
const projectId = Config.projectId;

// Instantiates a client
const translate = new Translate({
  projectId: projectId
});

const text = 'Hello, world!';
// The target language
const target = 'ja';

// Translates some text into Russian
exports.translate = functions.https.onRequest((request, response) => {
  // const word = request.body['word'];
  // const language = request.body['language'] || 'ja';
  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);

      return response.send(`${text}: ${translation}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});
