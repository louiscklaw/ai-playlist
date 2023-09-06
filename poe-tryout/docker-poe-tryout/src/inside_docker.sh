#!/usr/bin/env bash

set -ex

pushd poe-scheduler-api/tests/ask_poe/test2
  ./test.sh
  npx prettier --write .
popd

# pushd openbox-poe-seat/src/tests/ChatGPT/ask_with_md/test1
#   ./test.sh
#   npx prettier --write .
# popd

# pushd openbox-poe-seat/src/tests/ChatGPT/ask_helloworld/test1
#   ./test.sh
#   npx prettier --write .
# popd

# pushd openbox-poe-seat/src/tests/ChatGPT/ask_helloworld/test2
#   ./test.sh
#   npx prettier --write .
# popd

# pushd changedetect/diff-handler/src/tests/calculateMD5
#   node index.js
# popd

# pushd openbox-poe-seat/src/tests/ChatGPT/ask_with_md/helloworld
#   ./test.sh
#   npx prettier --write .
# popd

# pushd flow-handler/src/tests/jobsdb_flow_summarize_cb
  # node index.js
  # node test1.js
  # node test2.js
# popd


# pushd flow-handler/src/tests/jobsdb_draft_email
#   node test_md.js
#   # node index.js
#   # node test1.js
#   # node test2.js
# popd


# pushd flow-handler/src/tests/state_machine/jobsdb/onReportJobComplete/getJobInfo
#   node index.js
#   # node test1.js
#   # node test2.js
# popd


# pushd flow-handler/src/tests/utils/loadJson
#   node index.js
# popd

# pushd flow-handler/src/tests/jobsdb_draft_email_cb
  # node index.js
  # node test1.js
  # node test2.js
# popd

# openbox-poe-seat
# pushd openbox-poe-seat/src/tests/poeDownAlert
#   node ./index.js
# popd

# flow-handler/src/tests/state_machine/jobsdb/onPoeDraftEmailDone


# pushd openbox-poe-seat/src/tests/ChatGPT/ask_markdown_example
#   ./test.sh
#   npx prettier --write .
# popd

# pushd flow-handler/src/tests/state_machine/jobsdb/onPoeDraftEmailDone/writeEmail
#   npx nodemon ./test.js
# popd


# pushd dbapi/tests/VisitedLink
#   node ./clearall.js
#   node ./addLink.js
# popd


# pushd dbapi/tests/PoeSeatStatus
#   node ./poe_clear_all.js
#   node ./poe_offline.js

#   node ./poe_clear_all.js
#   node ./poe_online.js
#   node ./poe_get_status.js

#   node ./poe_clear_all.js
#   node ./poe_get_status.js
# popd

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

# pushd changedetect/diff-handler/src/tests/jobsdb_diff_handler/test3
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
