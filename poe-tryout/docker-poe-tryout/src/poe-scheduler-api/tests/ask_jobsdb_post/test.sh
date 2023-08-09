#!/usr/bin/env bash

set -ex

curl -X POST http://localhost:3002/ask_jobsdb_post \
   -H 'Content-Type: application/json' \
   -d @./input.json 
   
   # \
   # -o result_input.json
