#!/usr/bin/env bash

set -ex

YML_S='
-f ./docker-compose.yml
-f ./bait/docker-compose.yml
-f ./dbapi/docker-compose.yml
-f ./poe-scheduler-api/docker-compose.yml
-f ./static-share/docker-compose.yml
-f ./openbox-seat/docker-compose.yml
-f ./changedetect/docker-compose.yml
-f ./jobsdb-link-extractor/docker-compose.yml
-f ./flow-handler/docker-compose.yml
'

YML_DEV_S="
$YML_S
-f ./docker-compose.dev.yml
"

docker compose $YML_DEV_S pull

# NOTE: making of logickee/openbox-seat-ubuntu
cd ./openbox-seat
  ./build_docker.sh
cd -

docker compose $YML_S config > docker-compose.gen
docker compose $YML_DEV_S config > docker-compose.dev.gen
docker compose $YML_DEV_S up -d --build

exit 0

