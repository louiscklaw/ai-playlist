#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml build

# docker compose -f ./docker-compose.gen.yml kill redis poe-scheduler-api
docker compose -f ./docker-compose.gen.yml kill   api-debug \
  bait \
  changedetection \
  dbapi \
  diff-handler-redis \
  diff-handler \
  flow-handler \
  jobsdb-link-extractor \
  jobsdb-scraper \
  page-handler \
  poe-scheduler-api \
  static-share \
  v2raya

# docker volume rm src_redis_data
docker compose -f ./docker-compose.gen.yml up -d

sudo chown logic:logic -R .
