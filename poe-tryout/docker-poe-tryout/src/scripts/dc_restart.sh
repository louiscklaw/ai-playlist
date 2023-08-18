#!/usr/bin/env bash

set -ex

# docker compose -f ./docker-compose.gen kill redis poe-scheduler-api
docker compose -f ./docker-compose.gen down mongo dbapi
# docker volume rm src_redis_data
docker compose -f ./docker-compose.gen up -d mongo dbapi
  # flow-handler
  # diff-handler 
