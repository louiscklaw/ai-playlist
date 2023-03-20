#!/usr/bin/env bash

set -ex

docker compose -f docker/docker-compose.prod.yml pull
docker compose -f docker/docker-compose.prod.yml build
docker compose -f docker/docker-compose.dev.yml up -d

docker compose -f docker/docker-compose.dev.yml exec -it test bash
