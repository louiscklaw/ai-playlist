#!/usr/bin/env bash

set -ex

curl -X POST http://localhost:3003/jobsdbPostExtract \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result.json
