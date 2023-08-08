#!/usr/bin/env bash

set -ex

curl -X POST http://localhost:3000/chatgpt_summarize_helloworld \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result.json
