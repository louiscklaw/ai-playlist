#!/usr/bin/env bash

set -ex

# ask with preprompt
curl -X POST http://openbox-poe-seat1:3000/chatGPT/ask \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result.json
