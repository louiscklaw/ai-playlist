#! /usr/bin/env bash

set -x

# curl -X POST http://localhost:3000/chatgpt_role_play_helloworld \
#    -H 'Content-Type: application/json' \
#    -d @./no_preprompt_input.json \
#    -o result_no_preprompt_input.json
# sleep 1

# curl -X POST http://localhost:3000/chatgpt_role_play_helloworld \
#    -H 'Content-Type: application/json' \
#    -d @./prompt_list_zero_length.json \
#    -o result_prompt_list_zero_length.json
# sleep 1


curl -X POST http://localhost:3000/chatgpt_role_play_helloworld \
   -H 'Content-Type: application/json' \
   -d @./input.json \
   -o result_input.json
