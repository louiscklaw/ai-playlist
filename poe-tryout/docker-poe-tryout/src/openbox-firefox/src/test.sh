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
# node tests/poe_test_preprompt/test1.js
# node tests/poe_test_preprompt/test2.js
# node tests/poe_test_preprompt/test3.js
# node tests/poe_test_preprompt/test4.js
# node tests/poe_test_preprompt/test5.js

# node tests/tasks/summarize/test1.js
# node tests/tasks/summarize/test2.js
# node tests/tasks/summarize/test3.js
# node tests/tasks/summarize/test4.js


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

# logs
node tests/logs/newLog.js
# node tests/logs/helloworld.js
