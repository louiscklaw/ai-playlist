#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose.gen.yml exec -it \
  jobsdb-link-extractor bash
