#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml exec -it redis redis-cli

# https://blog.csdn.net/zhangjunli/article/details/103817837
# NOTE: to check redis with data directory
# need to match with redis.conf

# config get dir
# config set dir /data