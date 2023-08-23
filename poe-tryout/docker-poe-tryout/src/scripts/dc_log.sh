#!/usr/bin/env bash

set -ex

# docker logs --since 30s

docker compose-f ./docker-compose.gen.yml \
  logs  --since 180s  -f  api-debug dbapi diff-handler flow-handler jobsdb-link-extractor jobsdb-scraper page-handler poe-scheduler-api