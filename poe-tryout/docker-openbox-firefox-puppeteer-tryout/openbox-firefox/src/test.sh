#!/usr/bin/env bash

set -x

# rm -rf node_modules

export PUPPETEER_PRODUCT=firefox 

npm i puppeteer-core \
  express \
  dotenv

# node index.js
# node poe_send_and_reply.js
# node client_side_evaluate.js
# node poe_send_and_reply_test1.js
# node poe_send_and_reply.js
# node express-helloworld.js

# NOTE: preprompt
# node poe_test_preprompt/test1.js
# node poe_test_preprompt/test2.js
# node poe_test_preprompt/test3.js
# node poe_test_preprompt/test4.js
node poe_test_preprompt/test5.js
