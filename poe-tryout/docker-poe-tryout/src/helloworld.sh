#!/usr/bin/env bash


set -ex

pushd /src/tests
  npm i
  watch -n 1 "node ./check_all.js"
popd

# cd /src/flow-handler/src/tests/jobsdb_link_extract
#   node ./index.js
# cd -
