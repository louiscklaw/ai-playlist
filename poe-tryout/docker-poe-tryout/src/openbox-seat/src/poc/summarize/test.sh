#!/usr/bin/env bash


set -ex

# curl -X GET http://localhost:3000/summary/test

curl -X POST http://localhost:3000/summarize/test \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result_input.json
