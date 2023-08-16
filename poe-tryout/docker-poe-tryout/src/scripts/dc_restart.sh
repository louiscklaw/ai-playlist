#!/usr/bin/env bash

set -ex

docker compose \
  -f ./docker-compose.gen \
  restart redis
