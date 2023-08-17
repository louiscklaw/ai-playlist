#!/usr/bin/env bash

set -e

YML_S='
-f ./docker-compose.yml
-f ./api-debug/docker-compose.yml
-f ./bait/docker-compose.yml
-f ./changedetect/docker-compose.yml
-f ./dbapi/docker-compose.yml
-f ./flow-handler/docker-compose.yml
-f ./jobsdb-link-extractor/docker-compose.yml
-f ./openbox-poe-seat/docker-compose.yml
-f ./poe-scheduler-api/docker-compose.yml
-f ./static-share/docker-compose.yml
-f ./page-handler/docker-compose.yml
-f ./v2raya/docker-compose.yml
'

if [[ -v DOCKER_DEV ]]; then
  echo 
  echo 
  echo -e "\033[31m USING DEV DOCKER COMPOSE CONFIG !!! \033[0m"
  echo 
  echo 
  read -p "Press Enter to continue..."

  YML_S="
  $YML_S
  -f ./docker-compose.dev.yml
  "
else
  echo 
  echo 
  echo -e "\033[31m USING PROD DOCKER COMPOSE CONFIG !!! \033[0m"
  echo 
  echo 
  read -p "Press Enter to continue..."
fi

set -ex

docker compose $YML_S pull

docker compose $YML_S config > docker-compose.gen

docker compose $YML_S up -d --build

exit 0

