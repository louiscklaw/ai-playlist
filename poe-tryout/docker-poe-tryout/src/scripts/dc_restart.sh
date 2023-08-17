#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen kill redis poe-scheduler-api
docker compose -f ./docker-compose.gen down redis poe-scheduler-api
docker volume rm src_redis_data
docker compose -f ./docker-compose.gen up -d redis poe-scheduler-api
  # flow-handler
  # diff-handler 
