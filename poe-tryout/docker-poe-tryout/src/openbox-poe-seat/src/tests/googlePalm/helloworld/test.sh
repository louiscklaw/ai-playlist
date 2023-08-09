#!/usr/bin/env bash

set -ex

curl -X GET http://localhost:3000/googlePalm/helloworld

# curl -X POST http://localhost:3000/googlePalm/helloworld \
#    -H 'Content-Type: application/json' \
#    -d @./input.json \
#    -o result_input.json
