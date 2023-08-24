#!/usr/bin/env bash

set -ex

# openbox-poe-seat
# pushd openbox-poe-seat/src/tests/poeDownAlert
#   node ./index.js
# popd

pushd dbapi/tests/PoeSeatStatus
  node ./poe_clear_all.js
  node ./poe_offline.js

  node ./poe_clear_all.js
  node ./poe_online.js
  node ./poe_get_status.js

  node ./poe_clear_all.js
  node ./poe_get_status.js
popd

# src/page-handler/src/tests/telegramSendAlert
# pushd page-handler/src/tests/postTelegramAlert
#   node ./index.js
# popd

# # src/page-handler/src/tests/telegramSendAlert
# pushd page-handler/src/tests/telegramSendAlert
#   node ./index.js
# popd

# # # src/page-handler/src/tests/telegramSendMessage
# pushd page-handler/src/tests/telegramSendMessage
#   node ./index.js
# popd

# pushd /src/changedetect/diff-handler/src/tests/jobsdb_diff_handler/test3
#   node helloworld.js
# popd

# # src/openbox-poe-seat/src/tests/ChatGPT/ask_helloworld
# pushd openbox-poe-seat/src/tests/ChatGPT/ask_helloworld
#   bash -c ./test.sh
# popd

# pushd openbox-poe-seat/src/tests/googlePalm/ask_helloworld
#   bash -c ./test.sh
# popd

# src/flow-handler/src/tests/jobsdb_flow_summarize/index.js
# pushd /src/flow-handler/src/tests/jobsdb_flow_summarize
#   node index.js
# popd


# src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2/index.js
# pushd /src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2
  # node index.js
# popd
# pushd /src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2
#   node index.js
# popd
