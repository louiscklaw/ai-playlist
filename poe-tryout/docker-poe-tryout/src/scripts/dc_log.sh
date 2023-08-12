#!/usr/bin/env bash

set -ex

docker compose \
  -f ./docker-compose.yml \
  -f ./bait/docker-compose.yml \
  -f ./dbapi/docker-compose.yml \
  -f ./poe-scheduler-api/docker-compose.yml \
  -f ./static-share/docker-compose.yml \
  -f ./openbox-seat/docker-compose.yml \
  -f ./jobsdb-link-extractor/docker-compose.yml \
  -f ./flow-handler/docker-compose.yml \
  logs -f openbox-seat1
  # flow-handler 
  # -f jobsdb-link-extractor
  # poe-scheduler-api
