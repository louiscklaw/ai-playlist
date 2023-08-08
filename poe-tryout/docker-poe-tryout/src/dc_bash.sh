#!/usr/bin/env bash

set -ex

docker compose \
  -f ./docker-compose.yml \
  -f ./bait/docker-compose.yml \
  -f ./dbapi/docker-compose.yml \
  -f ./poe-scheduler-api/docker-compose.yml \
  -f ./static-share/docker-compose.yml \
  -f ./openbox-firefox/docker-compose.yml \
  -f ./jobsdb-link-extractor/docker-compose.yml \
  exec -it jobsdb-link-extractor bash
