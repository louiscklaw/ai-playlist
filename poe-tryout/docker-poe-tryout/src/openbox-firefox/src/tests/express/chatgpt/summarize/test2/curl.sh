#! /usr/bin/env bash

set -x

# curl -X POST http://localhost:3000/post_response \
#    -H 'Content-Type: application/json' \
#    -d @./no_question_input.json \
#    -o result_no_question_input.json


# sleep 1

# curl -X POST http://localhost:3000/post_response \
#    -H 'Content-Type: application/json' \
#    -d @./question_list_zero.json \
#    -o result_question_list_zero.json

# sleep 1
curl -X POST http://localhost:3000/chatgpt_summarize_helloworld \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result_input.json

# sleep 1
# curl http://localhost:3000/helloworld