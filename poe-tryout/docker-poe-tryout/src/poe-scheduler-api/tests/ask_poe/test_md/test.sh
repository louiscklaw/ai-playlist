#!/usr/bin/env bash

set -ex

curl -X POST http://poe-scheduler-api:3002/ask_poe \
   -H 'Content-Type: application/json' \
   -d @./input.json 
  #  \
  #  -o result_input.json

