#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen \
  exec -it jobsdb-scraper bash
