#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml build

# docker compose -f ./docker-compose.gen.yml kill redis poe-scheduler-api
docker compose -f ./docker-compose.gen.yml kill

# docker volume rm src_redis_data
docker compose -f ./docker-compose.gen.yml up -d --build
