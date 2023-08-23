#!/usr/bin/env bash

set -ex

# pushd /src/changedetect/diff-handler/src/tests/jobsdb_diff_handler/test3
#   node helloworld.js
# popd

# src/openbox-poe-seat/src/tests/ChatGPT/ask_helloworld
pushd openbox-poe-seat/src/tests/ChatGPT/ask_helloworld
  bash -c ./test.sh
popd


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
