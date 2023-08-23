#!/usr/bin/env bash

set -ex

pushd /src/changedetect/diff-handler/src/tests/jobsdb_diff_handler/test3
  node helloworld.js
popd

# src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2/index.js
# pushd /src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2
#   node index.js
# popd
