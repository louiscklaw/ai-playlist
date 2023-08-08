#!/usr/bin/env bash

set -ex

curl -X POST http://localhost:3002/process_new_job_post \
   -H 'Content-Type: application/json' \
   -d @./input.json 
  #  \
  #  -o result_input.json

