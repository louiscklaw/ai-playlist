#!/usr/bin/env bash

set -x

# rm -rf node_modules

export PUPPETEER_PRODUCT=firefox 

npm i puppeteer-core

# https://expressjs.com/en/starter/installing.html
npm i express
npm i dotenv

# node index.js
# node poe_send_and_reply.js
# node client_side_evaluate.js
# node poe_send_and_reply_test1.js
node poe_send_and_reply.js
# node express-helloworld.js
