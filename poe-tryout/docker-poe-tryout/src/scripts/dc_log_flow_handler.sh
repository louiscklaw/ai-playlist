#!/usr/bin/env bash

set -ex

# docker logs --since 30s

docker compose -f ./docker-compose.gen.yml \
  logs -f bait \
  flow-handler  