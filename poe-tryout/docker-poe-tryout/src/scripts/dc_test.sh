#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml exec -it test bash

# docker compose -f ./docker-compose.gen.yml exec -it redis redis-cli
# docker compose -f ./docker-compose.gen.yml exec -it bait bash
# docker compose -f ./docker-compose.gen.yml exec -it bait bash

# https://blog.csdn.net/zhangjunli/article/details/103817837
# NOTE: to check redis with data directory
# need to match with redis.conf

# config get dir
# config set dir /data
