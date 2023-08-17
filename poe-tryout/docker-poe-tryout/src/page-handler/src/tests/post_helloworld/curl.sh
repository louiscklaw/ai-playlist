#!/usr/bin/env bash

set -ex

curl -X POST http://localhost:3051/post_helloworld \
   -H 'Content-Type: application/json' \
   -d @./input.json 
  #  \
  #  -o result.json
