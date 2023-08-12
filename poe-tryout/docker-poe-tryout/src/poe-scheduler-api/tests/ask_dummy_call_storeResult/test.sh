#!/usr/bin/env bash

set -ex

curl -X POST http://poe-scheduler-api:3002/ask_jobsdb_post \
   -H 'Content-Type: application/json' \
   -d @./input.json 
   
   # NOTE: write to output file will trigger reload of the server, so comment this
   # \
   # -o result.json
