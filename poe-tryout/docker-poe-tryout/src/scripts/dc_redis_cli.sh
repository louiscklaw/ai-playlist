#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen exec -it redis redis-cli

# NOTE: to check redis with data directory
# need to match with redis.conf

# config get dir
# config set dir /data