#! /usr/bin/env bash

set -x

# sleep 1
curl -X POST http://localhost:3001/api/v1/JobPost \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result_input.json

# sleep 1
# curl http://localhost:3000/helloworld