#!/usr/bin/env bash

set -ex

curl -X POST http://page-handler:3000/post_helloworld \
   -H 'Content-Type: application/json' \
   -d @./input.json 
  #  \
  #  -o result.json
