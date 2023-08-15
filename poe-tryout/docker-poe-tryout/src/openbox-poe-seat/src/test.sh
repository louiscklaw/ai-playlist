#!/usr/bin/env bash

set -x

# rm -rf node_modules

export PUPPETEER_PRODUCT=firefox
npm install

npm i puppeteer-core \
  express \
  dotenv \
  puppeteer-extra \
  puppeteer-extra-plugin-stealth \
  puppeteer-extra-plugin-adblocker \
  puppeteer-proxy


# firefox chrome, stealthing
# npx nodemon --exec "node tests/firefox/proxy/index.js"
# npx nodemon --exec "node tests/firefox/stealthing/index.js"
# npx nodemon --exec "node tests/firefox/chatgpt/landing.js"

# npx nodemon --exec "node tests/chrome/stealthing/index.js"


# node index.js
# node poe_send_and_reply.js
# node client_side_evaluate.js
# node poe_send_and_reply_test1.js
# node poe_send_and_reply.js

# npx nodemon --exec "node tests/express/express-helloworld.js"
# npx nodemon --exec "node tests/express/poe_send_and_reply.js"
# npx nodemon --exec "node tests/express/chatgpt_summarize_helloworld.js"

# npx nodemon --exec "node poe/express/chatgpt/summarize/test2/index.js"

# npx nodemon --exec "node poe/tests/chatgpt/landing.js"
# npx nodemon --exec "node poe/tests/stealthing/index.js"

# npx nodemon --exec "node tests/express/chatgpt/summarize/test1/index.js"
# npx nodemon --exec "node tests/express/chatgpt/summarize/test2/index.js"

# npx nodemon --exec "node tests/express/chatgpt/role-play/test1/index.js"
# npx nodemon --exec "node tests/express/chatgpt/role-play/test2/index.js"

# node tests/express/chatgpt/concurrent_prompt/test1/index.js

# npx nodemon --exec "node tests/express/express-helloworld.js"

# chat gpt
# node tests/chatHistory/newChat.js
# node tests/chatgpt/poe_send_and_reply.js
# node tests/chatgpt/chatgpt_question_list.js
# node tests/chatgpt/poe_helloworld.js

# NOTE: preprompt
# node tests/poe_test_preprompt/test1.js
# node tests/poe_test_preprompt/test2.js
# node tests/poe_test_preprompt/test3.js
# node tests/poe_test_preprompt/test4.js
# node tests/poe_test_preprompt/test5.js

# node tests/tasks/summarize/test1.js
# node tests/tasks/summarize/test2.js
# node tests/tasks/summarize/test3.js
# node tests/tasks/summarize/test4.js
# node tests/tasks/summarize/test5.js


# node tests/tasks/role_play/test2.js
# node tests/tasks/role_play/test1.js

# node tests/markdown_content/test1.js

# node tests/tasks/draft_email/test1.js

# node tests/google-palm-prompt/test1.js
# node tests/google-palm-prompt/summarize/test1.js
# node tests/google-palm-prompt/summarize/test2.js
# node tests/google-palm-prompt/summarize/test3.js
# node tests/google-palm-prompt/summarize/test4.js

# node tests/google-palm-prompt/role-play/test1.js
# node tests/google-palm-prompt/role-play/test2.js

# node tests/google-palm-prompt/draft_email/test1.js

# chatHistory
# node tests/chatHistory/newLog.js
# node tests/chatHistory/helloworld.js

# NOTE: move to package.json
# npx nodemon --exec "node ./index.js"
# npm run dev

npm run dev
