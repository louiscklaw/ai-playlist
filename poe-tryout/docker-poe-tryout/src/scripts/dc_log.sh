#!/usr/bin/env bash

set -ex

docker compose \
  -f ./docker-compose.gen \
  logs -f  
  # diff-handler jobsdb-link-extractor
  
  #  bait jobsdb-link-extractor openbox-poe-seat1  flow-handler
  # bait jobsdb-link-extractor openbox-poe-seat1 poe-scheduler-api flow-handler
  # flow-handler 
  # -f jobsdb-link-extractor
  # poe-scheduler-api
