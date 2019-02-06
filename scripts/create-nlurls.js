const Discovery = require('ot-discovery');
const axios = require('axios');
const config = require('../config');
const PROJECT_ROOT = __dirname;
const path = require('path');

const {
  NODE_ENV = 'pp-sf',
  NLURL_PATH = '../nlurls'
} = process.env;

const host = config[NODE_ENV].host;
const discoveryClient = new Discovery(host);
const nlurls = require(`${path.join(PROJECT_ROOT, NLURL_PATH)}`).nlurls;

discoveryClient.connect()
  .then(() => {
    const reslocHost = discoveryClient.find('resource-locator');

    let index = 0;
    const createNlurl = () => {
      axios
        .post(`${reslocHost}/resourcelocator/v3/nlurls`, nlurls[index++], {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log('response..', response))
        .catch(error => console.log(`error ${error.response.statusText} with code ${error.response.status}: ${JSON.stringify(error.response.data)}`));

      if (index < nlurls.length) {
        setTimeout(createNlurl, 500);
      }
    };

    createNlurl();
  });