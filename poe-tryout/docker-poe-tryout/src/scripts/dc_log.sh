#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml \
  logs -f  api-debug dbapi diff-handler flow-handler jobsdb-link-extractor jobsdb-scraper page-handler poe-scheduler-api