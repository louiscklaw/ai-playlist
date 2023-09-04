#!/usr/bin/env bash

set -ex

curl -X POST http://openbox-poe-seat1:3000/chatGPT/ask_with_md \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result.json

# curl http://openbox-poe-seat1:3000/chatGPT/helloworld
