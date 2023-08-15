#!/usr/bin/env bash

set -ex


curl -X POST http://localhost:3000/googlePalm/ask \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result_input.json
