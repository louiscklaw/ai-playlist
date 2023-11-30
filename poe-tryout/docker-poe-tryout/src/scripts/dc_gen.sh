#!/usr/bin/env bash

set -e

YML_S='
-f ./docker-compose.yml
-f ./browserless-chrome/docker-compose.yml
-f ./redis/docker-compose.yml
-f ./poe-scheduler-api/docker-compose.yml
-f ./api-debug/docker-compose.yml
-f ./bait/docker-compose.yml
-f ./changedetect/docker-compose.yml
-f ./dbapi/docker-compose.yml
-f ./flow-handler/docker-compose.yml
-f ./jobsdb-link-extractor/docker-compose.yml
-f ./static-share/docker-compose.yml
-f ./page-handler/docker-compose.yml
-f ./v2raya/docker-compose.yml
-f ./openbox-poe-seat/docker-compose.yml
'

# YML_OPENBOX_S='
# -f ./docker-compose.yml
# '

if [[ -v DOCKER_DEV ]]; then
  echo 
  echo -e "\033[31m USING DEV DOCKER COMPOSE CONFIG !!! \033[0m"
  echo 
  read -p "Press Enter to continue..."

  YML_S="$YML_S -f ./docker-compose.dev.yml"
  
else
  echo 
  echo -e "\033[31m USING PROD DOCKER COMPOSE CONFIG !!! \033[0m"
  echo 
  read -p "Press Enter to continue..."
fi

docker compose $YML_S config > docker-compose.gen.yml
# docker compose $YML_OPENBOX_S config > docker-compose-openbox.gen.yml
