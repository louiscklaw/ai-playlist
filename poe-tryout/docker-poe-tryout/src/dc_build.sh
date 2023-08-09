#!/usr/bin/env bash

set -ex

cd ./openbox-seat
  ./build_docker.sh
cd -

docker compose \
  -f ./docker-compose.yml \
  -f ./bait/docker-compose.yml \
  -f ./dbapi/docker-compose.yml \
  -f ./poe-scheduler-api/docker-compose.yml \
  -f ./static-share/docker-compose.yml \
  -f ./openbox-seat/docker-compose.yml \
  -f ./changedetect/docker-compose.yml \
  -f ./jobsdb-link-extractor/docker-compose.yml \
  -f ./flow-handler/docker-compose.yml \
  config > docker-compose.gen

docker compose \
  -f ./docker-compose.yml \
  -f ./bait/docker-compose.yml \
  -f ./dbapi/docker-compose.yml \
  -f ./poe-scheduler-api/docker-compose.yml \
  -f ./static-share/docker-compose.yml \
  -f ./openbox-seat/docker-compose.yml \
  -f ./changedetect/docker-compose.yml \
  -f ./jobsdb-link-extractor/docker-compose.yml \
  -f ./flow-handler/docker-compose.yml \
  up -d --build
